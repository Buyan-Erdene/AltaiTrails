export function transformAylalData(aylal) {
    return {
        id: aylal.id,
        name: aylal.name,
        image: aylal.image,
        description: aylal.description,
        duration: aylal.duration,
        month: aylal.month,
        location: aylal.location,
        type: aylal.type,
        price: aylal.price
    };
}
