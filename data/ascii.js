s = ' ';
for( var i = 32; i <= 126; i++ ) {
    s += String.fromCharCode( i );
}

module.exports = Array.from('01233456789abcdefghijklmnopqrstuvwxyz[]{};.');