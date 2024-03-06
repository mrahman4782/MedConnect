import { View, Text, Pressable } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter, useSearchParams, useLocalSearchParams, useGlobalSearchParams } from 'expo-router'
import { useState } from "react";
import CustomPicker from "../../components/CustomPicker";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const UserPage = () => {
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
        { label: 'None', value: 'none' },
        { label: 'Insurer 1', value: 'insurer1' },
        { label: 'Insurer 2', value: 'insurer2' },
        { label: 'Insurer 3', value: 'insurer3' },
        { label: 'Insurer 4', value: 'insurer4' },
        { label: 'Insurer 5', value: 'insurer5' },
    ];

    const allergyItems = [
        { label: 'None', value: 'none' },
        { label: 'Peanuts', value: 'peanuts' },
        { label: 'Shellfish', value: 'shellfish' },
        { label: 'Dairy', value: 'dairy' },
        { label: 'Gluten', value: 'gluten' },
        { label: 'Soy', value: 'soy' },
    ];

    const medicationItems = [
        { label: 'None', value: 'none' },
        { label: 'Aspirin', value: 'aspirin' },
        { label: 'Ibuprofen', value: 'ibuprofen' },
        { label: 'Acetaminophen', value: 'acetaminophen' },
        { label: 'Antihistamine', value: 'antihistamine' },
        { label: 'Insulin', value: 'insulin' },
    ];

    const onPressSave = () => {
        console.warn("Save Button Pressed")
    }

    return (
        <View>
            <Text>This is userpage {id}</Text>
            <Text>First Name</Text>
            <CustomInput
                placeholder="First Name"
            />
            <Text>Last Name</Text>
            <CustomInput
                placeholder="Last Name"
            />
            <Text>Date of Birth</Text>
            <CustomInput
                placeholder="Date of Birth"
            />
            <Text>Phone Number</Text>
            <CustomInput
                placeholder="Phone Number"
                keyboardType="numeric"
                maxLength={10}
            />
            <Text>Email Address</Text>
            <CustomInput
                placeholder="Email Address"
                keyboardType="email-address"
            // value={} //this should be retrieved from user database when users initially sign up
            />
            <Text>Address</Text>
            <CustomInput
                placeholder="Address"
            />
            <Text>Ethnicity</Text>
            <CustomPicker
                items={ethnicityItems}
            />
            <Text>Sex</Text>
            <CustomPicker
                items={sexItems}
            />
            <Text>Insurer</Text>
            <CustomPicker
                items={insurerItems}
            />
            <Text>Any Allergies?</Text>
            <CustomPicker
                items={allergyItems}
            />
            <Text>Any Medication?</Text>
            <CustomPicker
                items={medicationItems}
            />
            <Text>Do you drink alcohol?</Text>
            <CustomPicker
                items={yesNoItems}
            />
            <Text>Do you smoke?</Text>
            <CustomPicker
                items={yesNoItems}
            />
            <Text>Medical History</Text>
            <CustomInput />

            <CustomButton
                text="Save"
                onPress={onPressSave}
            />
        </View>
    )
}

export default UserPage;