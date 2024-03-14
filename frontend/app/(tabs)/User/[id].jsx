import { View, Text, Pressable, ScrollView, useWindowDimensions } from "react-native";
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
            <View>
                <Text>This is userpage {id}</Text>
                <Text>First Name</Text>
                <CustomInput
                    value={firstName}
                    setValue={setFirstName}
                    placeholder="First Name"
                />
                <Text>Last Name</Text>
                <CustomInput
                    value={lastName}
                    setValue={setLastName}
                    placeholder="Last Name"
                />
                <Text>Date of Birth</Text>
                <CustomInput
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                    placeholder="Date of Birth"
                />
                <Text>Phone Number</Text>
                <CustomInput
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    maxLength={10}
                />
                <Text>Email Address</Text>
                <CustomInput
                    value={emailAddress}
                    setValue={setEmailAddress}
                    placeholder="Email Address"
                    keyboardType="email-address"
                // value={} //this should be retrieved from user database when users initially sign up
                />
                <Text>Address</Text>
                <CustomInput
                    value={address}
                    setValue={setAddress}
                    placeholder="Address"
                />
                <Text>Ethnicity</Text>
                <CustomPicker
                    selectedValue={ethnicity}
                    setSelectedValue={setEthnicity}
                    items={ethnicityItems}
                />
                <Text>Sex</Text>
                <CustomPicker
                    selectedValue={sex}
                    setSelectedValue={setSex}
                    items={sexItems}
                />
                <Text>Insurer</Text>
                <CustomSelectList
                    value={insurer}
                    setValue={setInsurer}
                    items={insurerItems}
                    notFoundText="Insurer not found"
                />
                <Text>Any Allergies?</Text>
                <CustomSelectList
                    value={allergies}
                    setValue={setAllergies}
                    items={allergyItems}
                    notFoundText="Allergies not found"
                />
                <Text>Any Medication?</Text>
                <CustomSelectList
                    value={medications}
                    setValue={setMedications}
                    items={medicationItems}
                    notFoundText="Medication not found"
                />
                <Text>Do you drink alcohol?</Text>
                <CustomPicker
                    selectedValue={drinkAlcohol}
                    setSelectedValue={setDrinkAlcohol}
                    items={yesNoItems}
                />
                <Text>Do you smoke?</Text>
                <CustomPicker
                    selectedValue={smoke}
                    setSelectedValue={setSmoke}
                    items={yesNoItems}
                />
                <Text>Medical History</Text>
                <CustomInput
                    value={medicalHistory}
                    setValue={setMedicalHistory}
                    placeholder="Medical Hisory"
                />

                <CustomButton
                    text="Save"
                    onPress={onPressSave}
                />
            </View>
        </ScrollView>
    )
}

export default UserPage;