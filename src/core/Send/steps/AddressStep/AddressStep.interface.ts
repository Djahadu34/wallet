import { SendRecipient, SendAmount, SendSteps } from '../../Send.interface';
import { StepComponentProps } from '$shared/components/StepView/StepView.interface';
import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import { AccountRepr } from 'tonapi-sdk-js';
import { CryptoCurrency } from '$shared/constants';

export interface AddressStepProps extends StepComponentProps {
  recipient: SendRecipient | null;
  decimals: number;
  stepsScrollTop: SharedValue<Record<SendSteps, number>>;
  setRecipient: React.Dispatch<React.SetStateAction<SendRecipient | null>>;
  setRecipientAccountInfo: React.Dispatch<React.SetStateAction<AccountRepr | null>>;
  setAmount: React.Dispatch<React.SetStateAction<SendAmount>>;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  onConfirmSending: ({ currency, amount, recipient, isJetton, jettonWalletAddress, decimals }) => Promise<void>;
  onChangeStep?: (id: SendSteps) => void;
  onChangeCurrency: (nextCurrency: CryptoCurrency | string, nextIsJetton?: boolean) => void;
  onContinue: () => void;
}
