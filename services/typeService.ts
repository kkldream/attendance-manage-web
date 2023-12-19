/**
 * 判断给定的 URL 是否是图片文件。
 * @param url 要检查的 URL 字符串
 * @returns 如果 URL 是图片文件返回 true，否则返回 false
 */
export function isImage(url: string) {
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
  return imageExtensions.test(url);
}
