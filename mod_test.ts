import { assert, assertEquals } from "std/testing/asserts.ts"
import * as mod from "./mod.ts"

const { test } = Deno

test({
  name: "public API assertions",
  fn() {
    assert(mod != null)
    assertEquals(typeof mod.UnicodeToUTF8, "function")
    assertEquals(typeof mod.StrToUTF8, "function")
  }
})
