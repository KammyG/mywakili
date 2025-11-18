export interface LegalArticleContent {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publish_date: string;
  is_constitution?: boolean;
}

export const fallbackConstitution: LegalArticleContent = {
  id: 9000,
  title: "Constitution of Kenya, 2010",
  summary:
    "The supreme law of Kenya outlining the structure of government, the Bill of Rights, and foundational national values.",
  content: `# THE CONSTITUTION OF KENYA, 2010

## PREAMBLE
We, the people of Kenya—acknowledging the supremacy of the Almighty God of all creation and proud of our rich diversity—hereby adopt, enact and give this Constitution to ourselves and to our posterity.

---

## CHAPTER ONE: SOVEREIGNTY OF THE PEOPLE AND SUPREMACY OF THIS CONSTITUTION
### 1. Sovereignty of the people
All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.

### 2. Supremacy of this Constitution
This Constitution is the supreme law of the Republic and binds all persons and all State organs at both levels of government.

---

## CHAPTER FOUR: THE BILL OF RIGHTS
### 19. Rights and fundamental freedoms
The Bill of Rights is the framework for social, economic and cultural policies and preserves the dignity of individuals and communities.

### 26. Right to life
Every person has the right to life and shall not be deprived of life intentionally, except to the extent authorised by this Constitution or other written law.

### 27. Equality and freedom from discrimination
Every person is equal before the law and has the right to equal protection and equal benefit of the law.

---

## CHAPTER SIX: LEADERSHIP AND INTEGRITY
State officers must exercise authority as a public trust that brings honour to the nation and promotes public confidence in the integrity of the office.

---

*This is a summary. For the full Constitution visit the official Kenya Law website.*`,
  category: "constitutional",
  author: "Government of Kenya",
  publish_date: "2010-08-27",
  is_constitution: true,
};

export const fallbackLaws: LegalArticleContent[] = [
  {
    id: 9101,
    title: "The Employment Act, 2007",
    summary:
      "Defines the fundamental rights of employees, conditions of employment and regulations around working hours, leave and fair labour practices.",
    content: `# THE EMPLOYMENT ACT, 2007

## PART I - PRELIMINARY
This Act may be cited as the Employment Act, 2007 and sets the interpretation of key employment terms.

## PART II - FUNDAMENTAL RIGHTS OF EMPLOYEES
Every employee has a right to fair labour practices, reasonable working conditions and the freedom to participate in trade unions.

## PART III - CONDITIONS OF EMPLOYMENT
Employers must regulate working hours, honour rest days, compensate overtime and provide annual leave of at least twenty-one working days.

*Refer to the official Kenya Law website for the full Act.*`,
    category: "employment",
    author: "Parliament of Kenya",
    publish_date: "2007-10-22",
  },
  {
    id: 9102,
    title: "The Penal Code (Cap. 63)",
    summary:
      "Kenya's principal criminal legislation defining offences such as murder, assault and theft together with their respective penalties.",
    content: `# THE PENAL CODE (CAP. 63)

## PART II - GENERAL RULES AS TO CRIMINAL RESPONSIBILITY
No person is criminally responsible for an act unless it is voluntary and intentional.

## PART V - OFFENCES AGAINST THE PERSON
Murder, assault and related offences are defined together with the applicable punishments.

## PART VI - OFFENCES RELATING TO PROPERTY
Theft and allied offences outline what constitutes property and the penalties for unlawful conversion.

*Refer to the official Kenya Law website for the full Code.*`,
    category: "criminal",
    author: "Parliament of Kenya",
    publish_date: "2012-01-01",
  },
  {
    id: 9103,
    title: "The Marriage Act, 2014",
    summary:
      "Provides for the recognition of different marriage systems, minimum age requirements and the rights and obligations of spouses.",
    content: `# THE MARRIAGE ACT, 2014

## PART II - TYPES OF MARRIAGES
Recognises monogamous and polygamous unions provided they are registered in accordance with the Act.

## PART III - RIGHTS AND OBLIGATIONS OF SPOUSES
Spouses share equal rights and obligations at all stages of marriage, including decision making and management of matrimonial property.

*Refer to the official Kenya Law website for the full Act.*`,
    category: "family",
    author: "Parliament of Kenya",
    publish_date: "2014-05-20",
  },
];

