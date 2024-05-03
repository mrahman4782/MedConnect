import { View, Text, Pressable, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter, useSearchParams, useLocalSearchParams, useGlobalSearchParams } from 'expo-router'
import { useState } from "react";
import CustomPicker from "../../components/CustomPicker";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomMultiSelect from "../../components/CustomMultiSelect/CustomMultiSelect";
import CustomSelectList from "../../components/CustomSelectList/CustomSelectList";
import { updateUserInfo } from "../../functions/updateUserInfo";
import Toast from 'react-native-toast-message';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const UserPage = () => {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [stateUS, setStateUS] = useState("");
    const [zip, setZip] = useState("");
    const [physician, setPhysician] = useState("");
    const [ethnicity, setEthnicity] = useState("african_american"); //set pickers to default value, otherwise they are empty
    const [sex, setSex] = useState("male")
    const [insurer, setInsurer] = useState('');
    const [allergies, setAllergies] = useState([]);
    const [medications, setMedications] = useState([]);
    const [drinkAlcohol, setDrinkAlcohol] = useState("no");
    const [smoke, setSmoke] = useState("no");
    const [medicalHistory, setMedicalHistory] = useState("");

    <Toast ref={(ref) => Toast.setRef(ref)} />

    const userData = {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        emailAddress,
        address,
        city,
        stateUS,
        zip,
        physician,
        ethnicity,
        sex,
        insurer,
        allergies,
        medications,
        drinkAlcohol,
        smoke,
        medicalHistory,
    };

    const { id } = useLocalSearchParams();

    const ethnicityItems = [
        { label: 'African American', value: 'african_american' },
        { label: 'Asian', value: 'asian' },
        { label: 'Hispanic/Latino', value: 'hispanic_latino' },
        { label: 'Native American', value: 'native_american' },
        { label: 'White', value: 'white' },
        { label: 'Other', value: 'other' },
    ];
    const yesNoItems = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
    ]

    const sexItems = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ]

    const insurerItems = [
        { label: 'Excellus', value: 'Excellus' },
        { label: 'Healthfirst', value: 'Healthfirst' },
        { label: 'MetroPlus', value: 'MetroPlus' },
        { label: 'Out-Of-Pocket', value: 'Self-pay' },
        { label: 'United HealthCare', value: 'United Healthcare' },
        { label: 'Medicare', value: 'Medicare' },
        { label: 'Medicaid', value: 'Medicaid' },
    ];

    const allergyItems = [
        { label: 'Peanuts', value: 'peanuts' },
        { label: 'Shellfish', value: 'shellfish' },
        { label: 'Dairy', value: 'dairy' },
        { label: 'Gluten', value: 'gluten' },
        { label: 'Soy', value: 'soy' },
    ];

    const medicationItems = [
        { label: 'Aspirin', value: 'aspirin' },
        { label: 'Ibuprofen', value: 'ibuprofen' },
        { label: 'Acetaminophen', value: 'acetaminophen' },
        { label: 'Antihistamine', value: 'antihistamine' },
        { label: 'Insulin', value: 'insulin' },
    ];

    const onPressSave = async () => {
        // console.warn("Save Button Pressed")
        //send info to backend
        console.log("UserPage: ", userData)
        let res = await updateUserInfo(userData);
        if (res.status == 200){
            console.log("Profile status updated");
            Toast.show({
                type: 'success',
                text1: 'Profile Updated',
                visibilityTime: 2000,
              });
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
            <View style={{ flex: 1, alignItems: 'center'}}>
                <FontAwesome name="user" size={60} color="#000" />
                </View>
    
                <Text style={styles.text}>FIRST NAME</Text>
                <CustomInput
                    value={firstName}
                    setValue={setFirstName}
                    placeholder="First Name"
                    style={styles.textFields}
                />
                <Text style={styles.text}>LAST NAME</Text>
                <CustomInput
                    value={lastName}
                    setValue={setLastName}
                    placeholder="Last Name"
                    style={styles.textFields}
                />
                <Text style={styles.text}>DATE OF BIRTH</Text>
                <CustomInput
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                    placeholder="Date of Birth"
                    style={styles.textFields}
                />
                <Text style={styles.text}>PHONE NUMBER</Text>
                <CustomInput
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    style={styles.textFields}
                    maxLength={10}
                />
                <Text style={styles.text}>EMAIL ADDRESS</Text>
                <CustomInput
                    value={emailAddress}
                    setValue={setEmailAddress}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    style={styles.textFields}
                // value={} //this should be retrieved from user database when users initially sign up
                />
                <Text style={styles.text}>ADDRESS</Text>
                <CustomInput
                    value={address}
                    setValue={setAddress}
                    placeholder="Address"
                    style={styles.textFields}
                />
                <Text style={styles.text}>CITY</Text>
                <CustomInput
                    value={city}
                    setValue={setCity}
                    placeholder="City"
                    style={styles.textFields}
                />
                <Text style={styles.text}>STATE</Text>
                <CustomInput
                    value={stateUS}
                    setValue={setStateUS}
                    placeholder="State"
                    style={styles.textFields}
                />
                <Text style={styles.text}>ZIPCODE</Text>
                <CustomInput
                    value={zip}
                    setValue={setZip}
                    placeholder="Zipcode"
                    keyboardType="numeric"
                    style={styles.textFields}
                />
                <Text style={styles.text}>PRIMARY PHYSICIAN</Text>
                <CustomInput
                    value={physician}
                    setValue={setPhysician}
                    placeholder="Primary Physician"
                    style={styles.textFields}
                />
                
                <Text style={styles.text}>ETHNICITY</Text>
                <CustomPicker
                    selectedValue={ethnicity}
                    setSelectedValue={setEthnicity}
                    items={ethnicityItems}
                    style={styles.textFields}
                />
                <Text style={styles.text}>SEX</Text>
                <CustomPicker
                    selectedValue={sex}
                    setSelectedValue={setSex}
                    items={sexItems}
                    style={styles.textFields}
                />
                <Text style={styles.text}>INSURER</Text>
                {/* <CustomSelectList
                    value={insurer}
                    setValue={setInsurer}
                    items={insurerItems}
                    notFoundText="Insurer not found"
                    style={styles.textFields}
                /> */}
                <CustomPicker
                    selectedValue={insurer}
                    setSelectedValue={setInsurer}
                    items={insurerItems}
                    style={styles.textFields}

                />
                <Text style={styles.text}>ANY ALLERGIES?</Text>
                <CustomSelectList
                    value={allergies}
                    setValue={setAllergies}
                    items={allergyItems}
                    notFoundText="Allergies not found"
                    style={styles.textFields}
                />
                <Text style={styles.text}>ANY MEDICATION?</Text>
                <CustomSelectList
                    value={medications}
                    setValue={setMedications}
                    items={medicationItems}
                    notFoundText="Medication not found"
                    style={styles.textFields}

                />
                <Text style={styles.text}>DO YOU DRINK ALCOHOL?</Text>
                <CustomPicker
                    selectedValue={drinkAlcohol}
                    setSelectedValue={setDrinkAlcohol}
                    items={yesNoItems}
                    style={styles.textFields}

                />
                <Text style={styles.text}>DO YOU SMOKE?</Text>
                <CustomPicker
                    selectedValue={smoke}
                    setSelectedValue={setSmoke}
                    items={yesNoItems}
                    style={styles.textFields}

                />
                <Text style={styles.text}>ANY MEDICAL HISTORY?</Text>
                <CustomInput
                    value={medicalHistory}
                    setValue={setMedicalHistory}
                    placeholder="Medical Hisory"
                    style={styles.textFields}

                />

                <CustomButton
                    text="Update"
                    onPress={onPressSave}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#F5F8FE',
        padding: 10,
    },
    textFields: {
        padding: 5,
        // color: '#757474',
        outline: 'none',
        borderWidth: 0,
        borderRadius: 5,
        
    },
    text: {
        paddingLeft: 5,
        fontSize: 10,
        marginTop: 10,
        paddingBottom: 5
    },
    
    root: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Change to match design
        padding: 20,
    },
    textFields: {
        borderRadius: 8, // Rounded corners
        padding: 15, // Generous padding for spacing
        fontSize: 16, // Increase font size
    },
    text: {
        fontSize: 16,
        color: '#000', // Darker color for text
        fontWeight: 'bold', // Bold font weight
        paddingTop: 15, // Space above label
        paddingLeft: 5, // Align text with input
    },
    
})

export default UserPage;