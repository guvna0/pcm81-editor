import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { PatchData, PatchFileEntry, SavePatchRequest, SysExEvent } from '../../shared/ipc';

const ensureDir = async (directory: string): Promise<void> => {
  await fs.mkdir(directory, { recursive: true });
};

export class FileService {
  async listPatchFiles(directory: string): Promise<PatchFileEntry[]> {
    await ensureDir(directory);
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const syxFiles = entries.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.syx'));

    const mapped = await Promise.all(
      syxFiles.map(async (entry) => {
        const fullPath = path.join(directory, entry.name);
        const stat = await fs.stat(fullPath);
        return {
          id: fullPath,
          name: entry.name,
          fullPath,
          modifiedAt: stat.mtimeMs,
          sizeBytes: stat.size,
          parseState: 'valid' as const
        };
      })
    );

    return mapped.sort((a, b) => b.modifiedAt - a.modifiedAt);
  }

  async savePatchFile(request: SavePatchRequest): Promise<{ syxPath: string; metaPath: string }> {
    if (request.targetBank !== 'register') {
      throw new Error('Saving is restricted to Register bank.');
    }

    await ensureDir(request.directory);
    const safeName = request.patch.name.replace(/[^a-z0-9-_]/gi, '_');
    const baseName = `${safeName || 'patch'}_${Date.now()}`;
    const syxPath = path.join(request.directory, `${baseName}.syx`);
    const metaPath = path.join(request.directory, `${baseName}.json`);

    // TODO: Replace with SysExCodec once hardware fixtures are validated.
    const fakeSysEx = `F0 TODO_SYSEX_NOT_IMPLEMENTED ${request.patch.name} F7\n`;
    await fs.writeFile(syxPath, fakeSysEx, 'utf-8');
    await fs.writeFile(metaPath, JSON.stringify(request.patch, null, 2), 'utf-8');

    return { syxPath, metaPath };
  }

  async loadPatchFile(fullPath: string): Promise<PatchData> {
    const directory = path.dirname(fullPath);
    const stem = path.basename(fullPath, '.syx');
    const metaPath = path.join(directory, `${stem}.json`);
    const raw = await fs.readFile(metaPath, 'utf-8');
    return JSON.parse(raw) as PatchData;
  }

  async exportSysExLog(destinationPath: string, events: SysExEvent[]): Promise<{ path: string }> {
    const rows = events
      .map((event) => `${new Date(event.timestamp).toISOString()} [${event.direction}] ${event.status} ${event.summary} :: ${event.bytesHex}`)
      .join('\n');
    await fs.writeFile(destinationPath, `${rows}\n`, 'utf-8');
    return { path: destinationPath };
  }
}
