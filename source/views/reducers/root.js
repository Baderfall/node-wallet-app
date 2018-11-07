export const rootCardId = (rootCardId = 1, action) => {
  switch (action.type) {
    case 'SWITCH_ROOT_CARD':
      return action.id
    default:
      return rootCardId
  }
}

export const cards = (cards = [], action) => cards

export const transactions = (transactions = [], action) => transactions
