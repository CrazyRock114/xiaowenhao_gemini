/**
 * Web Speech API 朗读工具
 * 支持纯前端原生语音合成，零外部网络依赖
 */
export function speakWord(text: string, lang = 'en-US') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return
  }

  try {
    window.speechSynthesis.cancel() // 停止上一段发音
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9 // 稍慢一些适合少儿听辨
    utterance.pitch = 1.05 // 略微明亮亲和

    // 优先选择自然的英美音发音人
    const voices = window.speechSynthesis.getVoices()
    const targetVoice = voices.find(
      (v) => (v.lang === lang || v.lang.startsWith(lang.slice(0, 2))) && !v.name.includes('Bad'),
    )
    if (targetVoice) utterance.voice = targetVoice

    window.speechSynthesis.speak(utterance)
  } catch {
    // 降级静默
  }
}
