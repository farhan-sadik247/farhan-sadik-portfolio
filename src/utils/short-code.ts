import crypto from 'crypto'

const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const DEFAULT_LENGTH = 6

/**
 * Generates a cryptographically secure URL-safe short code.
 * @param length The length of the generated code (default: 6)
 * @returns A randomly generated short code
 */
export function generateShortCode(length: number = DEFAULT_LENGTH): string {
  const charsCount = CHARSET.length
  const maxValid = 256 - (256 % charsCount)
  let result = ''

  while (result.length < length) {
    const bytes = crypto.randomBytes(1)
    if (bytes[0] < maxValid) {
      result += CHARSET[bytes[0] % charsCount]
    }
  }

  return result
}
