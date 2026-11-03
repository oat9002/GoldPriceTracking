import { Box, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";

function PricePanelSkeleton() {
    const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
    const animation = reduceMotion ? false : "pulse";

    return (
        <Box>
            <Typography role="status" variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Loading price trend and history…
            </Typography>
            <Box aria-hidden="true">
                <Skeleton animation={animation} width="45%" sx={{ mb: 1 }} />
                <Skeleton animation={animation} variant="rounded" height={320} />
                <Skeleton animation={animation} width={160} height={32} sx={{ mt: 2, mb: 1 }} />
                {Array.from({ length: 11 }, (_, row) => (
                    <Stack
                        key={row}
                        direction="row"
                        spacing={2}
                        sx={{ py: 1, borderBottom: 1, borderColor: "divider" }}
                    >
                        {["date", "buy", "sell"].map((column) => (
                            <Skeleton key={column} animation={animation} width="100%" height={20} />
                        ))}
                    </Stack>
                ))}
                <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 1 }}>
                    <Skeleton animation={animation} width={220} height={36} />
                </Stack>
            </Box>
        </Box>
    );
}

export default PricePanelSkeleton;
