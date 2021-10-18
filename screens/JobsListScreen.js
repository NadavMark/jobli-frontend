import React, { onChange } from 'react';
import { View, Text, FlatList, StyleSheet, Linking, TouchableHighlight, Pressable } from 'react-native';
import { Button } from 'react-native-elements';
import { get } from '../services/api.service';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function JobsListScreen({ navigation }) {

    const [data, updateData] = React.useState('');

    async function getData() {
            const res = await get('/api/seeker/relevant-jobs', {});
            updateData(mapResponse(res));
    }

    function mapResponse(list) {
        return list.data.map(el => {
            return {
             job_id: el.employer_job.job_id,
             created_time: (new Date(el.employer_job.created_time)).toLocaleDateString(),
             job_description: el.employer_job.job_description,
             job_scope: el.employer_job.job_scope,
             job_name: el.employer_job.job_name,
             job_fields: el.employer_job.job_fields.join(),
             business_name: el.employer.business_name,
             business_address: el.employer.business_address.city,
             business_website: el.employer.business_website,
             employer_email: el.employer.employer_email
            }
        })
    }

    React.useEffect(() => {
        getData();
    }, [])

     const renderJob = ({ item }) => (
         <View style={style.card}>
            <View style={style.cardRightSide}>
                <View style={style.cardRow}>
                    <Text style={style.businessName}>{item.business_name} </Text>
                    <Text style={style.businessAddress}>{item.business_address}</Text>
                </View>
                <View style={style.cardRow}>
                    <Text style={style.jobName}>{item.job_name}  </Text>
                    <Text>{item.job_fields}</Text>
                </View>
                <Text>{item.job_description}</Text>
                <Pressable style={style.applyButton} onPress={() => Linking.openURL('mailto:mailto@' + item.employer_email + '?subject=abcdefg&body=body')}>
                      <Text style={style.applyButtonText}>הגשת מועמדות  </Text>
                      <Icon name="angle-left" size={20} color="#900" />
                </Pressable>
            </View>
             <View style={style.cardLeftSide}>
                 <Text style={style.date}>{item.created_time}</Text>
                 <Text>{item.job_scope}</Text>
                 <Text>{item.business_website}</Text>
             </View>
         </View>
     )

    return (
        <View>
             <FlatList
                    data={data}
                    renderItem={renderJob}
                    keyExtractor={job => job && job.job_id ? job.job_id.toString() : null}
              />
        </View>
    );
}

const style = StyleSheet.create({
    card: {
         borderColor: '#848787',
         borderWidth: 1,
         marginTop: 15,
         marginRight: 10,
         marginLeft: 10,
         padding: 5,
         borderRadius: 10,
         flex: 1,
         flexDirection: "row",
         textAlign: "right"
    },
    cardRightSide: {
        flex: 2,
        flexDirection: "column",
        textAlign: "left"
    },
    cardLeftSide: {
        flex: 1,
        flexDirection: "column"
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 10
    },
    businessName: {
        fontSize: 12,
        fontWeight: "bold"
    },
    businessAddress: {
        fontSize: 10,
        marginRight: 10
    },
    jobName: {
        fontSize: 18
    },
    applyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    applyButtonText: {
        fontWeight: "bold",
        fontSize: 16
    },
    date: {
        fontSize: 10
    }
});