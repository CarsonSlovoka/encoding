import { assertEquals } from "std/testing/asserts.ts"
import { StrToUTF8, UnicodeToUTF8 } from "./encoding.ts"

const { test } = Deno

test("UnicodeToUTF8", () => {
  // 1 byte
  assertEquals(UnicodeToUTF8(65), "A")

  // 2 byte
  assertEquals(UnicodeToUTF8(0x81), "\x81")

  // 3 byte
  assertEquals(UnicodeToUTF8(0x801), "ࠁ")

  // 4 byte
  assertEquals(UnicodeToUTF8(0x2AA36), "𪨶")
  assertEquals(UnicodeToUTF8("0x2AA36"), "𪨶")
  assertEquals(UnicodeToUTF8("2AA36"), "𪨶")

  // 5 byte
  assertEquals(UnicodeToUTF8(0x200001), "�����")

  // 6 byte
  assertEquals(UnicodeToUTF8(0x4000001), "������")

  // 7 byte 最多只處理到6byte，所以會得到空字串
  assertEquals(UnicodeToUTF8(0x8000000), "")
})

test("StrToUTF8", () => {
  assertEquals(StrToUTF8("中"), new Uint8Array([228, 184, 173]))
})
