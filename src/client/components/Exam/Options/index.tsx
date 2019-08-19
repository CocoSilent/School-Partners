import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import exerciseStore from '../../../store/exerciseStore'

import './index.scss'

interface IProps {
  number: number,
  exerciseStore: exerciseStore
}

@inject('exerciseStore')
@observer
class Options extends Component<IProps, {}> {

  constructor(props) {
    super(props);
  }

  formatNumber(number: number): string {
    return String.fromCharCode(number + 65)
  }

  onOptionClick(number: number, index: number): void {
    const { exerciseStore: { handleOptionClick } } = this.props;
    handleOptionClick(number, index);
  }

  onConfirmClick(): void {
    const { exerciseStore: { handleConfirmClick } } = this.props;
    handleConfirmClick();
  }

  render() {
    const { number, exerciseStore: { topics, answers, fontSize } } = this.props;
    if (!answers[number] || !topics[number]) return;
    const { options } = topics[number];
    const buttonClassName: string = answers[number].some(_ => _ === 1) ? 'confirm' : 'confirm hide';
    return (
      <View className='exam-options'>
        {options.map((option, index) => {
          const optionClassName: string = answers[number][index] === 1 ? 'number active' : 'number';
          return (
            <View className='wrap' key={index} onClick={this.onOptionClick.bind(this, number, index)}>
              <View className={optionClassName}>{this.formatNumber(index)}</View>
              <View className={`content ${fontSize}`}>{option}</View>
            </View>
          )
        })}
        <View className={buttonClassName} onClick={this.onConfirmClick.bind(this)}>确认答案</View>
      </View>
    )
  }
}

export default Options
