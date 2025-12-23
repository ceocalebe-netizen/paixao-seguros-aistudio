
export interface InsuranceService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface RecommendationResponse {
  mainInsurance: string;
  reason: string;
  suggestedAddons: string[];
}
