export const shuffle = a => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export const countTypeInHand = (type, hand) => {
    // @type = 'technology', 'city', 'person', 'army', 'worker'
    console.log('you have', hand.filter(card => {
        return card().props.props.type === type;
    }).length, type, 'in hand');

    return hand.filter(card => {
        return card().props.props.type === type;
    }).length;
}