import { describe, expect, it } from 'vitest';
import fixtures from './fixtures/sysex-fixtures.json';
import { createUnimplementedSysExCodec } from '../src/shared/ipc';

describe('SysEx codec contract', () => {
  it('loads fixture captures for future hardware-driven validation', () => {
    expect(fixtures.length).toBeGreaterThan(1);
    expect(fixtures.map((fixture) => fixture.expectedProductId)).toEqual(['0x10', '0x07']);
  });

  it('is intentionally unimplemented until real hardware validation lands', () => {
    const codec = createUnimplementedSysExCodec();
    expect(() => codec.encodeProgramDump({
      id: 'todo',
      name: 'TODO',
      bank: 'register',
      program: 0,
      algorithm: 'TODO',
      parameters: {}
    })).toThrow(/TODO: SysEx encoding not implemented/);

    const validation = codec.validateMessage(new Uint8Array([0xF0, 0xF7]));
    expect(validation.valid).toBe(false);
  });
});
