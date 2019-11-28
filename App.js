import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import { Dimensions } from 'react-native';

const math = require('mathjs');
export default class App extends Component {
    constructor() {
        super();


        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };
        this.state = {
            resultText: '0',
            orientation: isPortrait() ? 'portrait' : 'landscape'
        };

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }



    calcResult() {
        const expression = this.state.resultText;
        this.setState({
            resultText: math.evaluate(expression),
            result:'',
        });
    }

    operation(sign) {
        switch (sign) {
            case '+':
                this.setState({
                    resultText: this.state.resultText + '+',
                });
                break;
            case '-':
                this.setState({
                    resultText: this.state.resultText + '-',
                });
                break;
            case '*':
                this.setState({
                    resultText: this.state.resultText + '*',
                });
                break;
            case '/':
                this.setState({
                    resultText: this.state.resultText + '/',
                });
                break;
            case '=':
                return this.calcResult();
            case 'AC':
                this.setState({
                    resultText: '0',
                });
                break;
            case '!':
                this.setState({
                    resultText: math.factorial(this.state.resultText),
                });
                break;
            case '10^x':
                this.setState({
                    resultText: math.pow(10, this.state.resultText),
                });
                break;
            case 'log10':
                this.setState({
                    resultText: math.log10(this.state.resultText),
                });
                break;
            case 'x2':
                this.setState({
                    resultText: math.pow(this.state.resultText, 2),
                });
                break;
            case 'x3':
                this.setState({
                    resultText: math.pow(this.state.resultText, 3),
                });
                break;
            case 'e':
                this.setState({
                    resultText: math.exp(this.state.resultText),
                });
                break;
            case 'e^x':
                this.setState({
                    resultText: math.pow(math.exp(), this.state.resultText),
                });
                break;
            case '√':
                this.setState({
                    resultText: math.sqrt(this.state.resultText),
                });
                break;
        }
    }


    nrPressed(text) {
        const{resultText} = this.state;
        this.setState({
            resultText: (resultText === '0') ? text: resultText + text,
        });
    }

    render() {
        let rows = [];
        let numbers = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, '', '.']];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(
                    <TouchableOpacity
                        key={numbers[i][j]}
                        onPress={() => this.nrPressed(numbers[i][j])}
                        style={styles.btn}>
                        <Text style={styles.buttonText}>{numbers[i][j]}</Text>
                    </TouchableOpacity>,
                );
            }
            rows.push(
                <View key={i} style={styles.row}>
                    {row}
                </View>,
            );
        }

        let operations =[];
        let op = [];
        let extraOperations =[];
        let extraop = [];

        if(this.state.orientation === 'portrait') {operations = ['AC', '/', '*', '+', '-', '='];}
        else {
            operations = ['AC', '/', '*', '+', '-', '='];
            extraOperations = [['!', 'log10'], ['x2', 'x3'], ['e', 'e^x'], ['10^x', '√']];
        }
        for (let i = 0; i < 7; i++) {
            op.push(
                <TouchableOpacity
                    key={operations[i]}
                    onPress={() => this.operation(operations[i])}
                    style={styles.btn}>
                    <Text style={styles.op}>{operations[i]}</Text>
                </TouchableOpacity>,
            );
        }
        if(this.state.orientation === 'landscape') {
            for (let i = 0; i < 4; i++) {
                let extraRow = [];
                for (let j = 0; j < 2; j++) {
                    extraRow.push(
                        <TouchableOpacity
                            key={extraOperations[i][j]}
                            onPress={() => this.operation(extraOperations[i][j])}
                            style={styles.btn}>
                            <Text style={styles.op}>{extraOperations[i][j]}</Text>
                        </TouchableOpacity>,
                    );
                }
                extraop.push(
                    <View key={i} style={styles.row}>
                        {extraRow}
                    </View>,
                );
            }
        }



        if(this.state.orientation === 'portrait') {
            return (
                <View style={styles.container}>
                    <View style={styles.result}>
                        <Text style={styles.resText}>{this.state.resultText}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.numbers}>{rows}</View>
                        <View style={styles.operations}>{op}</View>

                    </View>
                </View>
            );
        }else{
            return (
                <View style={styles.container}>
                    <View style={styles.result}>
                        <Text style={styles.resText}>{this.state.resultText}</Text>
                    </View>
                    <View style={styles.buttons_landscape}>
                        <View style={styles.operations2_landscape}>{extraop}</View>
                        <View style={styles.numbers_landscape}>{rows}</View>
                        <View style={styles.operations_landscape}>{op}</View>

                    </View>
                </View>
            )}
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    result: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'gray',
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    op: {
        color: 'white',
        fontSize: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
    },
    buttons: {
        flex: 7,
        flexDirection: 'row',
    },

    numbers: {
        flex: 3,
        backgroundColor: 'green',
    },
    operations: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'orange',
    },
    resText: {
        color: 'white',
        fontSize: 30,
        padding: 20,
    },
    extraRow: {
        flex: 2,
        backgroundColor: 'orange',
    },
    buttons_landscape:{
        flex:7,
        flexDirection:'row',
        alignItems:'stretch',
    },
    numbers_landscape:{
        flex:2,
        backgroundColor:'green',
    },
    operations_landscape:{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'orange',
        alignItems:'center',
    },
    operations2_landscape:{
        flex: 2,
        justifyContent: 'space-around',
        backgroundColor: 'orange',
        alignItems:'center',
    },
});
