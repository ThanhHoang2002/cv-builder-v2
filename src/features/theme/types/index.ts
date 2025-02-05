export interface Font {
  name: string
  languages: string[]
}

export interface FontFilterProps {
  onLanguageSelect: (language: string) => void
  openFilter: boolean
  setOpenFilter: (open: boolean) => void
  activeLanguage: string
}

export interface FontListProps {
  fonts: Font[]
  setOpen: (open: boolean) => void
  language: string
  setLanguage: (language: string) => void
}

export interface Template {
  id: number;
  name: string;
  order: number;
  accountTypeRequired: number;
  isFree: boolean;
  isPremium: boolean;
  isBasic: boolean;
  smallThumbnailUrl: string;
  thumbnailUrl: string;
  webpThumbnailUrl: string;
  smallWebpThumbnailUrl: string;
  type: string;
  isResumeTemplate: boolean;
  isCoverLetterTemplate: boolean;
  isResignationLetterTemplate: boolean;
  isWebTemplate: boolean;
  professions: string[];
  image_urls: {
    colors: {
      [key: string]: {
        thumbnail_url: string;
        webp_thumbnail_url: string;
        small_thumbnail_url: string;
        small_webp_thumbnail_url: string;
      };
    };
    backgrounds: {
      [key: string]: unknown;
    };
  };
}

export interface ViewAllTemplateProps {
  listTemplate: Template[] | undefined
  setOpen: (open: boolean) => void
}

export interface TemplateItemProps {
  template: Template
  onClick: (template: Template) => void
  width?: number
} 