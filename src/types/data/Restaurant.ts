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
  }
}
