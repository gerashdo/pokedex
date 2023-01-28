import React, { useEffect, useState } from 'react'
import { Platform, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props {
    style?: StyleProp<ViewStyle>;
    onDebounce?: ( value: string ) => void;
}

export const SearchInput = ({ style, onDebounce }:Props) => {

    const [inputValue, setInputValue] = useState('')
    const debouncedValue = useDebouncedValue( inputValue )

    useEffect(() => {
        if( onDebounce ) onDebounce( debouncedValue );
    }, [ debouncedValue ])
    
    return (
        <View style={{ 
            ...styles.container,
            ...style as any,
        }}>
            <View style={{ 
                ...styles.inputContainer,
                paddingHorizontal: ( Platform.OS === 'ios' ) ? 15 : 10,
            }}>
                <TextInput 
                    style={ styles.textInput }
                    placeholder='Buscar pokemon'
                    autoCapitalize='none'
                    autoCorrect={ false }
                    autoFocus={ true }
                    value={ inputValue }
                    onChangeText={ setInputValue }
                />
                <Icon 
                    size={ 30 }
                    name='search-outline'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    inputContainer:{
        height: 50,
        backgroundColor: '#F3F1F3',
        borderRadius: 25,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    }
})
