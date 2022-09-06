import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import { colors } from '../../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Rupiah } from '../../helper/Rupiah';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { ButtonCustom, Header2, HeaderComponent, Releoder } from '../../component';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Config from 'react-native-config';
import { Numformat } from '../../helper/Numformat';

let rupiahLocale = Intl.NumberFormat('id-ID');

const Type = (props) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={[styles.type, { backgroundColor: props.backgroundColor, borderColor: props.borderColor }]}></View>
            <Text style={{ paddingHorizontal: 5, color: '#696969' }}>{props.text}</Text>
        </View>
    )
}

const Career = ({ navigation }) => {
    const userReducer = useSelector((state) => state.UserReducer);
    const TOKEN = useSelector((state) => state.TokenApi);
    const [point, setPoint] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [career, setCareer] = useState({})
    const [member, setMember] = useState({})

    useEffect(() => {
        Axios.get(Config.API_CAREER + `?customer_id=${userReducer.id}`,
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }
            })
            .then((result) => {
                console.log('data career', result.data)
                setCareer(result.data.data)
                setMember(result.data.data2)
                setIsLoading(false)
            }).catch((error) => {
                console.log('err', error.request._response)
                setIsLoading(false)
            });
    }, [])


    if (isLoading) {
        return (
            <Releoder />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <Header2 title='Jenjang Karir' btn={() => navigation.goBack()} />
                <View style={styles.infoTopUp}>
                    <Text style={styles.textTopUpKe}>Jenjang Karir </Text>
                    <View style={styles.line} />
                </View>
                <ScrollView>
                    <View>
                        {career.map((list) => {
                            return (
                                <View style={styles.infoTopUp}>

                                    <View style={styles.contentInfoSaldo}>
                                        <Icon
                                            name="credit-card"
                                            size={20}
                                            style={styles.iconWallet}
                                        />
                                        <View>
                                            <Text style={styles.textMinyakBelogCash}>
                                                {list.name}
                                            </Text>
                                            <Text style={styles.infoSaldo}>
                                                {list.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.padTop}>
                                        <Text style={styles.textNominalTopUp}>
                                            Aktivasi/Upgrade
                                            {list.member_activation_status == 1 &&
                                                <Type
                                                    backgroundColor='#1AE383'
                                                    borderColor='#13CE75'
                                                    text=''
                                                />
                                            }
                                            {list.member_activation_status == 0 &&
                                                <Type
                                                    backgroundColor='#FF0000'
                                                    borderColor='#E30303'
                                                    text=''
                                                />
                                            }
                                        </Text>
                                        <Text style={styles.infoSaldo}>
                                            {member.member.activations.name}//{list.activations.name}
                                        </Text>
                                    </View>
                                    <View style={styles.padTop}>
                                        <Text style={styles.textNominalTopUp}>
                                            Repeat Order Minimal
                                            {list.member_ro_status == 1 &&
                                                <Type
                                                    backgroundColor='#1AE383'
                                                    borderColor='#13CE75'
                                                    text=''
                                                />
                                            }
                                            {list.member_ro_status == 0 &&
                                                <Type
                                                    backgroundColor='#FF0000'
                                                    borderColor='#E30303'
                                                    text=''
                                                />
                                            }
                                        </Text>
                                        <Text style={styles.infoSaldo}>
                                            {Numformat(member.member_ro)}//{Numformat(list.ro_min_bv)}
                                        </Text>
                                    </View>
                                    <View style={styles.padTop}>
                                        <Text style={styles.textNominalTopUp}>
                                            Minimal Komisi
                                            {list.member_fee_status == 1 &&
                                                <Type
                                                    backgroundColor='#1AE383'
                                                    borderColor='#13CE75'
                                                    text=''
                                                />
                                            }
                                            {list.member_fee_status == 0 &&
                                                <Type
                                                    backgroundColor='#FF0000'
                                                    borderColor='#E30303'
                                                    text=''
                                                />
                                            }
                                        </Text>
                                        <Text style={styles.infoSaldo}>
                                            Bulan-1: {Numformat(member.member_fee1[0].total)}//{Numformat(list.fee_min)}
                                        </Text>
                                        <Text style={styles.infoSaldo}>
                                            Bulan-2: {Numformat(member.member_fee2[0].total)}//{Numformat(list.fee_min)}
                                        </Text>
                                        <Text style={styles.infoSaldo}>
                                            Bulan-3: {Numformat(member.member_fee3[0].total)}//{Numformat(list.fee_min)}
                                        </Text>
                                    </View>
                                    <View style={styles.padTop}>
                                        <Text style={styles.textNominalTopUp}>
                                            Refrensi Langsung
                                            {list.member_down_status == 1 &&
                                                <Type
                                                    backgroundColor='#1AE383'
                                                    borderColor='#13CE75'
                                                    text=''
                                                />
                                            }
                                            {list.member_down_status == 0 &&
                                                <Type
                                                    backgroundColor='#FF0000'
                                                    borderColor='#E30303'
                                                    text=''
                                                />
                                            }
                                        </Text>
                                        <Text style={styles.infoSaldo}>
                                            {list.member_down}  {list.activationdownlines.name}//{list.ref_downline_num} {list.activationdownlines.name}
                                        </Text>
                                    </View>
                                    <View style={styles.padTop}>
                                        <Text style={styles.textNominalTopUp}>
                                            Peringkat Team
                                            {list.team_level_status == 1 &&
                                                <Type
                                                    backgroundColor='#1AE383'
                                                    borderColor='#13CE75'
                                                    text=''
                                                />
                                            }
                                            {list.team_level_status == 0 &&
                                                <Type
                                                    backgroundColor='#FF0000'
                                                    borderColor='#E30303'
                                                    text=''
                                                />
                                            }
                                        </Text>
                                        {list.team_levels.map((list2) => {
                                                return (
                                                    <Text style={styles.infoSaldo}>
                                                        {list2.amount}  {list2.name}//{list2.careertype_amount}  {list2.name}
                                                    </Text>
                                                );
                                            })
                                        }
                                    </View>
                                </View>
                            );
                        })}

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Career;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: colors.default,
        alignItems: 'center',
    },
    padTop: {
        marginTop: 10,
    },
    line: {
        borderWidth: 5,
        borderColor: '#e8e8e8',
    },
    btnBack: {
        marginRight: 10,
    },
    textTopUp: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoTopUp: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
    },
    textTopUpKe: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentInfoSaldo: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.disable,
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    iconWallet: {
        marginRight: 20,
        borderWidth: 1,
        textAlign: 'center',
        padding: 5,
        borderRadius: 5,
        backgroundColor: colors.default,
        borderColor: colors.default,
        color: '#ffffff',
    },
    textMinyakBelogCash: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    infoSaldo: {
        color: colors.dark,
    },
    contentNominalTopUp: {
        backgroundColor: '#ffffff',
        marginTop: 5,
        padding: 20,
    },
    textNominalTopUp: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    btnNominal: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 50,
        borderColor: '#fbf6f0',
        marginHorizontal: 5,
    },
    textNominal: {
        fontSize: 13,
        color: 'black',
    },
    textAtauMasukanNominal: {
        marginTop: 10,
        color: colors.dark,
    },
    textInputNominal: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fbf6f0',
        borderColor: '#fbf6f0',
        marginBottom: 10,
        padding: 10,
    },
    contentTransfer: {
        marginTop: 5,
        // backgroundColor: 'red',
        padding: 20,
    },
    textTransferBank: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    boxBtnTambahKartuAtm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnTambahBank: {
        alignItems: 'center',
        borderWidth: 2,
        paddingVertical: 30,
        borderRadius: 10,
        paddingHorizontal: 25,
        borderColor: colors.default,
        backgroundColor: '#fbf6f0',
        marginVertical: 12,
        marginHorizontal: 10,
        width: 160,
        // textAlign : 'center'
        // alignItems : 'center'
    },
    textTambahKartu: {
        marginTop: 10,
        color: colors.dark,
        textAlign: 'center',
    },
    containerButton: {
        backgroundColor: '#ffffff',
        height: 65,
        borderWidth: 1,
        borderColor: colors.disable,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTopUp: {
        borderWidth: 1,
        borderRadius: 10,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.disable,
        borderColor: colors.disable,
        paddingHorizontal: 100,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonColor: {
        backgroundColor: '#ff781f',
        borderColor: '#ff781f',
    },
    type: {
        width: 15,
        height: 15,
        borderRadius: 15,
        borderWidth: 2,
        marginLeft: 10,
        marginTop: 20,
    }
});
