import React from 'react';
import * as Font from 'expo-font';
import {Asset} from 'expo-asset';
import { AppLoading } from 'expo';

 //funcion asincrona, se debe cargar despues de que lo creamos,
 // entonces sabe que será funcion asincrona que ejecuta las promesas 
// y cuando termina llama al callback
const usePromiseAll = (promises, callback) => {
    React.useEffect(() => {
        const execPromises = async () => {
            await Promise.all(promises);
            callback();
        };
        execPromises();
    });
}

const useLoadAssets = (assets, fonts) => {
    const [ready, setReady] = React.useState(false);

    usePromiseAll([Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))], () => 
        setReady(true)
    );

    return ready;
};

const LoadAssets = ({assets, fonts, children}) => {

    const ready = useLoadAssets(assets || [], fonts || []);

    if(!ready){
        return <AppLoading/>;
    }
    return <React.Fragment>{children}</React.Fragment>;

}

export default LoadAssets;
