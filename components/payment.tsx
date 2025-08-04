import { fetchAPI } from '@/lib/fetch';
import { PaymentProps } from '@/types/type';
import { useStripe } from '@stripe/stripe-react-native';
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
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

  const fetchPaymentSheetParams = async ({ amount }: { amount: string }) => {
    const response = await fetchAPI(`/(api)/(stripe)/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
      }),
    });

    console.log('response:', response);

    const { paymentIntent, ephemeralKey, customer } = response;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    console.log('start initializing payment sheet');

    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams({ amount });

      console.log('paymentIntent:', paymentIntent);
      console.log('ephemeralKey:', ephemeralKey);
      console.log('customer:', customer);

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
        console.log('error', error);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openPaymentSheet = async () => {
    console.log('press Checkout');
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <Screen>
      <CustomButton
        disabled={!loading}
        title="Checkout=="
        onPress={() => openPaymentSheet()}
      />
    </Screen>
  );
};

export default Payment;
