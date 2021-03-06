import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Select } from './'

const CardLayout = styled.div`
	cursor: pointer;
	position: relative;
	width: 260px;
	height: 164px;
	box-sizing: border-box;
	margin-bottom: 15px;
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: ${({ bgColor, active }) => (active ? bgColor : 'rgba(255, 255, 255, 0.1)')};
`

const CardLogo = styled.div`
	height: 28px;
	margin-bottom: 25px;
	background-image: url(${({ url }) => url});
	background-size: contain;
	background-repeat: no-repeat;
	filter: ${({ active }) => (active ? 'none' : 'grayscale(100%) opacity(60%)')};
`

const CardNumber = styled.div`
	margin-bottom: 20px;
	color: ${({ active, textColor }) => (active ? textColor : 'rgba(255, 255, 255, 0.6)')};
	font-size: 16px;
	font-family: 'OCR A Std Regular';
`

const CardType = styled.div`
	height: 26px;
	background-image: url(${({ url }) => url});
	background-size: contain;
	background-repeat: no-repeat;
	background-position-x: right;
	opacity: ${({ active }) => (active ? '1' : '0.6')};
`

const NewCardLayout = styled(CardLayout)`
	background-color: transparent;
	background-image: url('/assets/cards-add.svg');
	background-repeat: no-repeat;
	background-position: center;
	box-sizing: border-box;
	border: 2px dashed rgba(255, 255, 255, 0.2);
`

const CardSelect = styled(Select)`
	width: 100%;
	margin-bottom: 15px;
`

/**
 * Карта
 */
function Card(props) {
	const { data, type, active, onClick, selectedCardId, onCardChange } = props

	if (type === 'new') {
		return (
			<NewCardLayout />
		)
	}

	if (type === 'select') {
		const activeCard = data.find(card => card.id === selectedCardId)
		const { bgColor, bankLogoUrl, brandLogoUrl } = activeCard.theme

		return (
			<CardLayout active bgColor={bgColor}>
				<CardLogo url={bankLogoUrl} active />
				<CardSelect value={activeCard.number} onChange={id => onCardChange(parseInt(id, 10))}>
					{data.map((card, index) => (
						<Select.Option key={index} value={`${card.id}`}>{card.number}</Select.Option>
					))}
				</CardSelect>
				<CardType url={brandLogoUrl} active />
			</CardLayout>
		)
	}

	const { number, theme } = data
	const { bgColor, textColor, bankLogoUrl, brandLogoUrl } = theme
	const themedBrandLogoUrl = active ? brandLogoUrl : brandLogoUrl.replace(/-colored.svg$/, '-white.svg')

	return (
		<CardLayout active={active} bgColor={bgColor} onClick={onClick} >
			<CardLogo url={bankLogoUrl} active={active} />
			<CardNumber textColor={textColor} active={active}>
				{number}
			</CardNumber>
			<CardType url={themedBrandLogoUrl} active={active} />
		</CardLayout>
	)
}

Card.propTypes = {
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	selectedCardId: PropTypes.number,
	type: PropTypes.string,
	active: PropTypes.bool,
	onClick: PropTypes.func,
	onCardChange: PropTypes.func
}

export default Card
