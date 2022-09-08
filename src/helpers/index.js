export const cambiarFormatoFecha = (oldFormat) => {
    const fechaNueva = new Date(oldFormat)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'

    }
    return fechaNueva.toLocaleDateString('en-Es', opciones);
}