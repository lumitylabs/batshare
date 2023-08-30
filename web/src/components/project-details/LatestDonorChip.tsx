function truncateWallet(wallet: string, startLength = 6, endLength = 4) {
  const truncatedPart = "...";
  if (wallet.length > startLength + endLength) {
    return (
      wallet.substring(0, startLength) +
      truncatedPart +
      wallet.substring(wallet.length - endLength)
    );
  }
  return wallet;
}

export function LatestDonorChip(props: { wallet: string }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 px-3 rounded-full">
      <span className="flex font-BalooDa2 font-medium text-[16px] text-[#2F7DCD]">
        {truncateWallet(props.wallet, 6, 4)}
      </span>
    </div>
  );
}
