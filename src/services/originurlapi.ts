export async function OriginUrlApi(url: string) {
    let urlobject = url.split('/');
    let api = urlobject[1];
    if (api === 'atualizacao-cadastral') {
        return {
            type: 'atualizacao',
            token_prod: 'ae1fa8223f2df229045fd2040d78e240',
            token_test: '2a327df94d6260e1dee6408b6d44a301',

            price: '785'
        };
    }
    else if (api === 'primeira-via') {
        return {
            type: 'primeira-via',
            token_prod: 'ae1fa8223f2df229045fd2040d78e240',
            token_test: '2a327df94d6260e1dee6408b6d44a301',
            price: '999'
        };
    }
    return url

}