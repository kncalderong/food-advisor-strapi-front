export interface RestaurantDataType {
  id: string
  attributes: {
    name: string
    image: {
      data: {
        attributes: {
          url: string
        }
      }[]
    }
    description: string
    dishes?: {
      data: DishDataType
    }
  }
}

export interface DishDataType {
  id: string
  attributes: {
    name: string
    description: string
    price: number
    image: {
      data: {
        attributes: {
          url: string
        }
      }
    }
  }
}

export interface CartDataType {
  items: ItemDataType[]
  total: number
}

export interface ItemDataType extends DishDataType {
  quantity: number
}
