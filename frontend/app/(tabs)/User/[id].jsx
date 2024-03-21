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
    const [insurer, setInsurer] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const [medications, setMedications] = useState([]);
    const [drinkAlcohol, setDrinkAlcohol] = useState("no");
    const [smoke, setSmoke] = useState("no");
    const [medicalHistory, setMedicalHistory] = useState("");

    const userData = {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        emailAddress,
        address,
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
        { label: 'Insurer 1', value: 'insurer1' },
        { label: 'Insurer 2', value: 'insurer2' },
        { label: 'Insurer 3', value: 'insurer3' },
        { label: 'Insurer 4', value: 'insurer4' },
        { label: 'Insurer 5', value: 'insurer5' },
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

    const onPressSave = () => {
        // console.warn("Save Button Pressed")
        //send info to backend
        console.log("UserPage: ", userData)
        updateUserInfo(userData)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                {/* <Text>This is userpage {id}</Text> */}
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
                <CustomSelectList
                    value={insurer}
                    setValue={setInsurer}
                    items={insurerItems}
                    notFoundText="Insurer not found"
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
                    text="Save"
                    onPress={onPressSave}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#e0e1dd',
        padding: 10,
    },
    textFields: {
        padding: 5,
        color: '#757474',
        outline: 'none',
        borderWidth: 0,
        borderRadius: 5,
        
    },
    text: {
        paddingLeft: 5,
        fontSize: 10,
        marginTop: 10,
        paddingBottom: 5
    }
    
    
})

export default UserPage;