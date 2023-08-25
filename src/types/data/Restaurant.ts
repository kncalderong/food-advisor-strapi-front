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
