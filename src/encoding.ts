/**
 * @description
 * U+0000000 ~ U+000007f => 0xxxxxxx
 * U+0000080 ~ U+00007ff => 110xxxxx 10xxxxxx
 * U+0000800 ~ U+000ffff => 1110xxxx 10xxxxxx 10xxxxxx
 * U+0010000 ~ U+010ffff => 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 * U+0200000 ~ U+3ffffff => 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
 * U+4000000 ~ U+7ffffff => 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
 * ch: '中' 0x4E2D 落於 0x000800 ~ 0x00ffff => 3個byte
 * => 4E2D = 0100 1110 0010 1101
 * 1110xxxx 10xxxxxx 10xxxxxx => 把x的部分依序由上面三個byte填入即是答案
 * 11100100 10111000 10101101
 * 228      184      173
 * @param {string} unicodeHex 0x2AA36, 2AA36皆可
 */
export function UnicodeToUTF8(unicodeHex: string | number): string {
  let uint8Array = new Uint8Array()
  const v = typeof unicodeHex === "string"
    ? parseInt(unicodeHex, 16)
    : unicodeHex
  if (v <= 0x7f) {
    uint8Array = new Uint8Array([v])
  } else if (0x80 <= v && v <= 0x7ff) {
    const vStr = v.toString(2).padStart(11, "0")
    uint8Array = new Uint8Array([
      parseInt(`110${vStr.substring(0, 5)}`, 2),
      parseInt(`10${vStr.substring(5, 11)}`, 2),
    ])
  } else if (0x800 <= v && v <= 0xffff) {
    const vStr = v.toString(2).padStart(16, "0")
    uint8Array = new Uint8Array([
      parseInt(`1110${vStr.substring(0, 4)}`, 2),
      parseInt(`10${vStr.substring(4, 10)}`, 2),
      parseInt(`10${vStr.substring(10, 16)}`, 2),
    ])
  } else if (0x10000 <= v && v <= 0x10ffff) {
    const vStr = v.toString(2).padStart(21, "0")
    uint8Array = new Uint8Array([
      parseInt(`11110${vStr.substring(0, 3)}`, 2),
      parseInt(`10${vStr.substring(3, 9)}`, 2),
      parseInt(`10${vStr.substring(9, 15)}`, 2),
      parseInt(`10${vStr.substring(15, 21)}`, 2),
    ])
  } else if (0x200000 <= v && v <= 0x3ffffff) {
    const vStr = v.toString(2).padStart(26, "0")
    uint8Array = new Uint8Array([
      parseInt(`111110${vStr.substring(0, 2)}`, 2),
      parseInt(`10${vStr.substring(2, 8)}`, 2),
      parseInt(`10${vStr.substring(8, 14)}`, 2),
      parseInt(`10${vStr.substring(14, 20)}`, 2),
      parseInt(`10${vStr.substring(20, 26)}`, 2),
    ])
  } else if (0x4000000 <= v && v <= 0x7ffffff) {
    const vStr = v.toString(2).padStart(31, "0")
    uint8Array = new Uint8Array([
      parseInt(`1111110${vStr.substring(0, 1)}`, 2),
      parseInt(`10${vStr.substring(1, 7)}`, 2),
      parseInt(`10${vStr.substring(7, 13)}`, 2),
      parseInt(`10${vStr.substring(13, 19)}`, 2),
      parseInt(`10${vStr.substring(19, 25)}`, 2),
      parseInt(`10${vStr.substring(25, 31)}`, 2),
    ])
  }
  if (uint8Array.length === 0) {
    return ""
  }
  return new TextDecoder("utf-8").decode(uint8Array)
}

export function StrToUTF8(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}
