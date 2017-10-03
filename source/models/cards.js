const fs = require('fs');
const path = require('path');

const ApplicationError = require('../../libs/application-error');
const FileModel = require('./common/fileModel');

class Cards extends FileModel {
	constructor () {
		super('cards.json');
	}

	async add(card) {
		const isDataValid = (
			card &&
			card.hasOwnProperty('cardNumber') &&
			card.hasOwnProperty('balance')
		);
		if (isDataValid) {
			card.id = this._generateId();
			this._fileData.push(card);
			await this._saveUpdates();
			return card;
		} else {
			throw new ApplicationError('Card data is invalid', 400);
		}
	}

	async delete(id) {
		const card = this._fileData.find((item) => {
			return item.id === id;
		});
		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}
		const cardIndex = this._fileData.indexOf(card);
		this._fileData.splice(cardIndex, 1);
		await this._saveUpdates();
	}
}

module.exports = Cards;
