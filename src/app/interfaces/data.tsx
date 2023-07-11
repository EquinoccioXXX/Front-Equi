interface Data {
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
    user: {
        _id: string;
        usrNombre: string;
        usrApPaterno: string;
        usrApMaterno: string;
        usrCi: string;
        usrFechaNacimiento: string;
        usrSexo: string;
        usrDireccion: string;
        usrCelular: string;
        usrEmail: string;
        usrTipoUsuario: string;
        usrPassword: string;
        usrFoto: string;
        usrEstado: boolean;
        createdAt: string;
        __v: number;
        hashedRefreshToken: string;
      };
}
export default Data;