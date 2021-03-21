

export interface User {
    gender: string,
    name: Name,
    location: Location,
    email: string,
    dob: {
        date: string,
        age: number
    },
    phone: string,
    cell: string,
    id: {
        name: string,
        value: string
    },
    picture: Photo,
    nat: string
}

export interface Location {
    street: {
        number: number,
        name: string
    },
    city: string,
    state: string,
    country: string,
    postcode: number,
    coordinates: {
        latitude: string,
        longitude: string
    },
    timezone: {
        offset: string,
        description: string
    }
}

export interface Name {
    title: string,
    first: string,
    last: string
}

export interface Photo {
    large: string,
    medium: string,
    thumbnail: string
}