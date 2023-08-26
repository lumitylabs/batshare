export type ProjectData = {
    category: string;
    creator: string;
    description: string;
    nft_id: string;
    nft_image: string;
    status: string;
    title: string;
  };
  
  export type MiniProjectModel = {
    [url: string]: ProjectData;
  };