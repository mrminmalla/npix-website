import type { Member } from "@/types";

export const MEMBERS: Member[] = [
  { id: "m01", name: "Everest Broadband", logo: "", category: "ISP", asn: "AS131901", website: "https://everestbroadband.example.np", ipv6Support: true, memberSince: "2015-03-12" },
  { id: "m02", name: "Himal Link Communications", logo: "", category: "ISP", asn: "AS134022", website: "https://himallink.example.np", ipv6Support: true, memberSince: "2015-06-01" },
  { id: "m03", name: "Sagarmatha Netcom", logo: "", category: "ISP", asn: "AS132985", website: "https://sagarmathanet.example.np", ipv6Support: false, memberSince: "2016-01-20" },
  { id: "m04", name: "Annapurna Fiber Networks", logo: "", category: "ISP", asn: "AS137744", website: "https://annapurnafiber.example.np", ipv6Support: true, memberSince: "2016-09-15" },
  { id: "m05", name: "Langtang Wireless", logo: "", category: "ISP", asn: "AS139120", website: "https://langtangwireless.example.np", ipv6Support: false, memberSince: "2017-02-10" },
  { id: "m06", name: "Kanchenjunga Telecom", logo: "", category: "ISP", asn: "AS141056", website: "https://kanchenjungatel.example.np", ipv6Support: true, memberSince: "2018-05-22" },
  { id: "m07", name: "Manaslu Internet Services", logo: "", category: "ISP", asn: "AS142881", website: "https://manaslunet.example.np", ipv6Support: true, memberSince: "2019-04-03" },
  { id: "m08", name: "Gaurishankar Data Networks", logo: "", category: "ISP", asn: "AS144210", website: "https://gaurishankardata.example.np", ipv6Support: false, memberSince: "2020-08-11" },

  { id: "m09", name: "Sagarmatha Development Bank", logo: "", category: "Bank", asn: "AS151002", website: "https://sagarmathabank.example.np", ipv6Support: true, memberSince: "2017-07-18" },
  { id: "m10", name: "Himalayan Commerce Bank", logo: "", category: "Bank", asn: "AS151330", website: "https://himalayancommerce.example.np", ipv6Support: false, memberSince: "2018-02-27" },
  { id: "m11", name: "Kathmandu Valley Bank", logo: "", category: "Bank", asn: "AS152118", website: "https://kathmanduvalleybank.example.np", ipv6Support: true, memberSince: "2019-11-05" },
  { id: "m12", name: "Pashupati Finance Ltd.", logo: "", category: "Bank", asn: "AS152944", website: "https://pashupatifinance.example.np", ipv6Support: false, memberSince: "2020-03-30" },
  { id: "m13", name: "Everest Cooperative Bank", logo: "", category: "Bank", asn: "AS153567", website: "https://everestcoopbank.example.np", ipv6Support: true, memberSince: "2021-06-14" },

  { id: "m14", name: "Department of Digital Governance", logo: "", category: "Government", asn: "AS161004", website: "https://digitalgov.example.gov.np", ipv6Support: true, memberSince: "2016-04-01" },
  { id: "m15", name: "National Statistics Bureau", logo: "", category: "Government", asn: "AS161288", website: "https://statsbureau.example.gov.np", ipv6Support: false, memberSince: "2017-10-09" },
  { id: "m16", name: "Ministry of Communication Services", logo: "", category: "Government", asn: "AS161933", website: "https://mocs.example.gov.np", ipv6Support: true, memberSince: "2018-12-19" },
  { id: "m17", name: "Kathmandu Metropolitan e-Office", logo: "", category: "Government", asn: "AS162410", website: "https://ktmeoffice.example.gov.np", ipv6Support: false, memberSince: "2019-09-25" },

  { id: "m18", name: "Tribhuvan Technical University", logo: "", category: "Education", asn: "AS171045", website: "https://ttu.example.edu.np", ipv6Support: true, memberSince: "2015-09-01" },
  { id: "m19", name: "Kathmandu Institute of Engineering", logo: "", category: "Education", asn: "AS171622", website: "https://kie.example.edu.np", ipv6Support: true, memberSince: "2016-08-14" },
  { id: "m20", name: "Pokhara School of Information Technology", logo: "", category: "Education", asn: "AS172290", website: "https://psit.example.edu.np", ipv6Support: false, memberSince: "2018-01-17" },
  { id: "m21", name: "Nepal Academy of Science & Research", logo: "", category: "Education", asn: "AS172815", website: "https://nasr.example.edu.np", ipv6Support: true, memberSince: "2020-05-06" },

  { id: "m22", name: "Bagmati Cloud Systems", logo: "", category: "Technology", asn: "AS181077", website: "https://bagmaticloud.example.np", ipv6Support: true, memberSince: "2017-03-21" },
  { id: "m23", name: "Trishuli Data Centers", logo: "", category: "Technology", asn: "AS181654", website: "https://trishulidc.example.np", ipv6Support: true, memberSince: "2018-06-30" },
  { id: "m24", name: "Rara Software Labs", logo: "", category: "Technology", asn: "AS182309", website: "https://rarasoftware.example.np", ipv6Support: false, memberSince: "2019-02-12" },
  { id: "m25", name: "Koshi Content Delivery", logo: "", category: "Technology", asn: "AS182871", website: "https://koshicdn.example.np", ipv6Support: true, memberSince: "2020-10-08" },
  { id: "m26", name: "Chitwan Cyber Solutions", logo: "", category: "Technology", asn: "AS183422", website: "https://chitwancyber.example.np", ipv6Support: false, memberSince: "2021-04-19" },
  { id: "m27", name: "Lumbini Edge Networks", logo: "", category: "Technology", asn: "AS183990", website: "https://lumbiniedge.example.np", ipv6Support: true, memberSince: "2022-01-25" },
];

export const MEMBER_CATEGORIES: { value: Member["category"]; label: string }[] = [
  { value: "ISP", label: "Internet Service Providers" },
  { value: "Bank", label: "Banks & Financial Institutions" },
  { value: "Government", label: "Government Organizations" },
  { value: "Education", label: "Educational Institutions" },
  { value: "Technology", label: "Technology Companies" },
];
