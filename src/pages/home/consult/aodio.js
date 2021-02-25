import Taro from '@tarojs/taro'
export const voiceReciver = Taro.getRecorderManager()
export const voicePlayer = Taro.createInnerAudioContext()