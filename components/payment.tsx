import { images } from '@/assets/constants';
import { fetchAPI } from '@/lib/fetch';
import { PaymentProps } from '@/types/type';
import { useStripe } from '@stripe/stripe-react-native';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Screen } from 'react-native-screens';
import CustomButton from './custom-button';

const Payment = ({
  amount,
  fullName,
  email,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchPaymentSheetParams = async ({
    amount,
    email,
    name,
  }: {
    amount: string;
    email: string;
    name: string;
  }) => {
    const response = await fetchAPI(`/(api)/(stripe)/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        email,
        name,
      }),
    });

    const { paymentIntent, ephemeralKey, customer } = response;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    console.log('start initializing payment sheet');
    console.log('Payment props:', { amount, email, fullName });

    // Clean and validate the fullName
    const cleanName = fullName?.trim() || 'Guest User';
    const cleanEmail = email?.trim();
    const cleanAmount = amount?.toString().trim();

    console.log('Cleaned values:', {
      amount: cleanAmount,
      email: cleanEmail,
      name: cleanName,
    });

    // Validate props before proceeding
    if (
      !cleanAmount ||
      cleanAmount === '0' ||
      !cleanEmail ||
      !cleanName ||
      cleanName === 'null null' ||
      cleanName === 'undefined undefined'
    ) {
      Alert.alert('Error', 'Missing payment information. Please try again.');
      return;
    }

    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams({
          amount: cleanAmount,
          email: cleanEmail,
          name: cleanName,
        });

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: fullName,
          email,
        },
        returnURL: Linking.createURL('stripe-redirect'),
        applePay: {
          merchantCountryCode: 'US',
        },
      });

      if (!error) {
        setLoading(true);
      }
    } catch (error) {
      console.log('fetchPaymentSheetParams or initpayment error', error);
    }
  };

  const openPaymentSheet = async () => {
    console.log('press Checkout');
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      // Alert.alert('Success', 'Your order is confirmed!');
      setSuccess(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <Screen>
      <CustomButton
        disabled={!loading}
        title="Checkout"
        onPress={() => openPaymentSheet()}
      />

      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push('/(root)/(tabs)/home');
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </Screen>
  );
};

export default Payment;
