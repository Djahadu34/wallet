import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Screen, Spacer, Text, copyText } from '@tonkeeper/uikit';
import { useParams } from '@tonkeeper/router/src/imperative';
import { View, StyleSheet } from 'react-native';
import { memo, useCallback, useMemo } from 'react';
import { useNavigation } from '@tonkeeper/router';
import { useNewWallet } from '@tonkeeper/shared/hooks/useNewWallet';

function getRandIndexes(length: number, indexes: number[] = []) {
  if (indexes.length === length) {
    return indexes.sort((a, b) => a - b);
  }

  const randIndex = Math.floor(Math.random() * 23);
  if (!indexes.includes(randIndex)) {
    indexes.push(randIndex);
  }

  return getRandIndexes(length, indexes);
}

export const BackupPhraseScreen = memo(() => {
  const wallet = useNewWallet();
  const params = useParams<{ phrase: string; isBackupAgain?: boolean }>();
  const safeArea = useSafeAreaInsets();
  const nav = useNavigation();

  const phrase = useMemo(() => params.phrase.split(' '), [params.phrase]);
  const leftColumn = useMemo(() => phrase.slice(0, 12), [phrase]);
  const rightColumn = useMemo(() => phrase.slice(12, 24), [phrase]);

  const getRandomWords = useCallback(() => {
    return getRandIndexes(3).map((index) => ({ word: phrase[index], index }));
  }, [phrase]);

  return (
    <Screen>
      <Screen.Header />
      <View style={styles.container}>
        <Text type="h2" textAlign="center">
          Recovery Phrase
        </Text>
        <Spacer y={4} />
        <Text type="body1" color="textSecondary" textAlign="center">
          Write down these words with their numbers and store them in a safe place.
        </Text>
        <Spacer y={16} />

        <View style={styles.centered}>
          <View style={styles.columns}>
            <View style={styles.leftColumn}>
              {leftColumn.map((word, index) => (
                <View style={styles.line} key={`${word}-${index}`}>
                  <Text type="body2" color="textSecondary" style={styles.num}>
                    {index + 1}.
                  </Text>
                  <Text type="body1">{word}</Text>
                </View>
              ))}
            </View>
            <View>
              {rightColumn.map((word, index) => (
                <View style={styles.line} key={`${word}-${index + 1 + 12}`}>
                  <Text type="body2" color="textSecondary" style={styles.num}>
                    {index + 1 + 12}.
                  </Text>
                  <Text type="body1">{word}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.buttonContainer, { paddingBottom: safeArea.bottom + 32 }]}>
        {wallet.lastBackupTimestamp !== null && !params.isBackupAgain ? (
          <Button title="Copy" color="secondary" onPress={copyText(params.phrase)} />
        ) : (
          <Button
            title="Check Backup"
            onPress={() =>
              nav.navigate('/backup-check-phrase', { words: getRandomWords() })
            }
          />
        )}
      </View>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columns: {
    flexDirection: 'row',
    maxWidth: 310,
    paddingTop: 16,
  },
  line: {
    width: 151,
    flexDirection: 'row',
    marginBottom: 8,
    height: 24,
  },
  leftColumn: {
    paddingHorizontal: 16,
  },
  num: {
    width: 24,
    height: 23,
    marginRight: 4,
    position: 'relative',
    top: 3,
  },
  buttonContainer: {
    marginTop: 16,
    marginHorizontal: 32,
  },
});