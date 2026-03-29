import { Card, Center, Stack, Text } from '@mantine/core';

export function UnderConstruction() {
  return (
    <Center style={{ height: '100vh' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack align="center" gap="md">
          <h1>Under Construction</h1>
          <Text size="md" c="dimmed">
            This is currently under construction. Please check back later.
          </Text>
        </Stack>
      </Card>
    </Center>
  );
}
