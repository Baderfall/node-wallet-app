import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import axios from 'axios'

import { Card, Title, Button, Island, Input } from './'

const WithdrawTitle = styled(Title)`
	text-align: center;
`

const WithdrawLayout = styled(Island)`
	width: 440px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const InputField = styled.div`
	margin: 20px 0;
	position: relative;
`

const SumInput = styled(Input)`
	max-width: 200px;
	padding-right: 20px;
	background-color: rgba(0, 0, 0, 0.08);
	color: #000;
`

const Currency = styled.span`
	font-size: 12px;
	position: absolute;
	right: 10;
	top: 8px;
`

/**
 * Класс компонента Withdraw
 */
class Withdraw extends Component {
	static getDerivedStateFromProps(nextProps) {
		return {
			selectedCardId: nextProps.inactiveCardsList[0].id,
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			selectedCardId: props.inactiveCardsList[0].id,
			sum: ''
		}
	}

	/**
	 * Обработка изменения значения в input
	 * @param {Event} event событие изменения значения input
	 */
	onChangeInputValue(event) {
		if (!event) {
			return
		}

		const { name, value } = event.target

		this.setState({
			[name]: value
		})
	}

	/**
	 * Отправка формы
	 * @param {Event} event событие отправки формы
	 */
	onSubmitForm(event) {
		if (event) {
			event.preventDefault()
		}

		const { sum, selectedCardId } = this.state
		const { rootCardId } = this.props

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum)
		if (!isNumber || sum <= 0) {
			return
		}

		axios.post(`/cards/${rootCardId}/card2CardPay`, { sum, toId: selectedCardId })
			.then(() => {
				this.setState({ sum: '' })
			})
	}

	onCardChange(selectedCardId) {
		this.setState({
			selectedCardId
		})
	}

	/**
	 * Функция отрисовки компонента
	 * @returns {JSX}
	 */
	render() {
		const { inactiveCardsList } = this.props

		return (
			<form onSubmit={event => this.onSubmitForm(event)}>
				<WithdrawLayout>
					<WithdrawTitle>Перевести деньги на карту</WithdrawTitle>
					<Card
						type='select'
						data={inactiveCardsList}
						selectedCardId={this.state.selectedCardId}
						onCardChange={selectedCardId => this.onCardChange(selectedCardId)}
					/>
					<InputField>
						<SumInput
							name='sum'
							value={this.state.sum}
							onChange={event => this.onChangeInputValue(event)}
						/>
						<Currency>$</Currency>
					</InputField>
					<Button type='submit'>Перевести</Button>
				</WithdrawLayout>
			</form>
		)
	}
}

Withdraw.propTypes = {
	rootCardId: PropTypes.number.isRequired,
	inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Withdraw
