const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
export const BACKEND_URL = API_BASE_URL.replace('/api/v1', '');

export interface HomeBannerData {
  id: number;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image?: string | null;
  mobile_image?: string | null;
  button_text?: string | null;
  button_url?: string | null;
  sort_order?: number;
}

export interface WhatWeOfferData {
  id: number;
  title: string;
  description: string | null;
  icon?: string | null;
  icon_bg?: string | null;
  sort_order?: number;
}

export interface ContactInfoData {
  id?: number;
  name?: string | null;
  phone?: string | null;
  alt_phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  alt_email?: string | null;
  address?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  x?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
}

export interface WebsiteImageData {
  id: number;
  key: string;
  image: string | null;
  description?: string | null;
}

export interface CmsPageData {
  id: number;
  title: string;
  slug: string;
  badge_text?: string | null;
  subtitle?: string | null;
  image?: string | null;
  pillars?: string[] | null;
  button_text?: string | null;
  button_url?: string | null;
  content: string;
}

export interface FaqData {
  id: number;
  question: string;
  answer: string;
  category?: string | null;
}

export interface CategoryData {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
}

export interface SubjectData {
  id: number;
  name: string;
  slug: string;
  category_id?: number | null;
  image?: string | null;
}

export interface CountryData {
  id: number;
  name: string;
  code?: string | null;
  dial_code?: string | null;
  currency?: string | null;
}

export interface LocationData {
  id: number;
  name: string;
  city?: string | null;
  country_id?: number | null;
  country?: CountryData | null;
}

export interface EducationLevelData {
  id: number;
  name: string;
}

export interface AdvertisementData {
  id: number;
  title: string;
  slug: string;
  type: 'tutor' | 'lsa' | 'student_requirement';
  description: string;
  education_level?: string | null;
  qualification?: string | null;
  experience?: string | null;
  teaching_mode?: string | null;
  availability?: string | null;
  preferred_days?: string[] | null;
  fee_min?: number | null;
  fee_max?: number | null;
  fee_type?: string | null;
  contact_name?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  status: string;
  user?: { name: string; email: string };
  category?: CategoryData;
  subject?: SubjectData;
  location?: LocationData;
  city?: string | null;
  created_at: string;
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 }, // 10s revalidation for ISR/SSR
      ...options,
    });

    if (!res.ok) {
      console.warn(`API call ${endpoint} returned status ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching API ${endpoint}:`, error);
    return null;
  }
}

export const api = {
  getHomeBanners: () => fetchApi<HomeBannerData[]>('/cms/home-banners'),
  getWhatWeOffer: () => fetchApi<WhatWeOfferData[]>('/cms/what-we-offer'),
  getContactInfo: () => fetchApi<ContactInfoData>('/cms/contact-info'),
  getWebsiteImages: () => fetchApi<WebsiteImageData[]>('/cms/website-images'),
  getCmsPage: (slug: string) => fetchApi<CmsPageData>(`/cms/pages/${slug}`),
  getFaqs: () => fetchApi<FaqData[]>('/cms/faqs'),
  getCategories: () => fetchApi<CategoryData[]>('/categories'),
  getSubjects: () => fetchApi<SubjectData[]>('/subjects'),
  getLocations: () => fetchApi<LocationData[]>('/locations'),
  getCountries: () => fetchApi<CountryData[]>('/countries'),
  getTeachingModes: () => fetchApi<{id: number, name: string, is_active: boolean}[]>('/teaching-modes'),
  getEducationLevels: () => fetchApi<EducationLevelData[]>('/education-levels'),
  getAdvertisements: (params?: Record<string, string>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchApi<{ data: AdvertisementData[]; total: number }>(`/advertisements${queryString}`);
  },
  postAdvertisement: async (data: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/advertisements`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to post advertisement: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Error posting advertisement:', error);
      throw error;
    }
  },
};
