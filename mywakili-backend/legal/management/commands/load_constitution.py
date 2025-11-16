from django.core.management.base import BaseCommand
from legal.models import LegalArticle

class Command(BaseCommand):
    help = 'Load the Constitution of Kenya and sample laws into the database'

    def handle(self, *args, **options):
        # Constitution of Kenya - Preamble and Key Chapters
        constitution_content = """
# THE CONSTITUTION OF KENYA, 2010

## PREAMBLE

We, the people of Kenya—
Acknowledging the supremacy of the Almighty God of all creation:
Honouring those who heroically struggled to bring freedom and justice to our land:
Proud of our ethnic, cultural and religious diversity, and determined to live in peace and unity as one indivisible sovereign nation:
Respecting the environment, which is our heritage, and determined to sustain it for the benefit of future generations:
Committed to nurturing and protecting the well-being of the individual, the family, communities and the nation:
Recognising the aspirations of all Kenyans for a government based on the essential values of human rights, equality, freedom, democracy, social justice and the rule of law:

HEREBY ADOPT, ENACT AND GIVE THIS CONSTITUTION TO OURSELVES AND TO OUR POSTERITY.

---

## CHAPTER ONE: SOVEREIGNTY OF THE PEOPLE AND SUPREMACY OF THIS CONSTITUTION

### 1. Sovereignty of the people
(1) All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.
(2) The people may exercise their sovereign power either directly or through their democratically elected representatives.
(3) Sovereign power under this Constitution is delegated to the following State organs, which shall perform their functions in accordance with this Constitution—
(a) Parliament and the legislative assemblies in the county governments;
(b) the national executive and the executive structures in the county governments; and
(c) the Judiciary and independent tribunals.

### 2. Supremacy of this Constitution
(1) This Constitution is the supreme law of the Republic and binds all persons and all State organs at both levels of government.
(2) No person may claim or exercise State authority except as authorised under this Constitution.
(3) The validity or legality of this Constitution is not subject to challenge by or before any court or other State organ.
(4) Any law, including customary law, that is inconsistent with this Constitution is void to the extent of the inconsistency, and any act or omission in contravention of this Constitution is invalid.

---

## CHAPTER FOUR: THE BILL OF RIGHTS

### 19. Rights and fundamental freedoms
(1) The Bill of Rights is an integral part of Kenya's democratic state and is the framework for social, economic and cultural policies.
(2) The purpose of recognising and protecting human rights and fundamental freedoms is to preserve the dignity of individuals and communities and to promote social justice and the realisation of the potential of all human beings.
(3) The rights and fundamental freedoms in the Bill of Rights—
(a) belong to each individual and are not granted by the State;
(b) do not exclude other rights and fundamental freedoms not in the Bill of Rights, but recognised or conferred by law, except to the extent that they are inconsistent with this Chapter; and
(c) are subject only to the limitations contemplated in this Constitution.

### 20. Application of Bill of Rights
(1) The Bill of Rights applies to all law and binds all State organs and all persons.
(2) Every person shall enjoy the rights and fundamental freedoms in the Bill of Rights to the greatest extent consistent with the nature of the right or fundamental freedom.
(3) In applying a provision of the Bill of Rights, a court shall—
(a) develop the law to the extent that it does not give effect to a right or fundamental freedom; and
(b) adopt the interpretation that most favours the enforcement of a right or fundamental freedom.

### 26. Right to life
(1) Every person has the right to life.
(2) The life of a person begins at conception.
(3) A person shall not be deprived of life intentionally, except to the extent authorised by this Constitution or other written law.

### 27. Equality and freedom from discrimination
(1) Every person is equal before the law and has the right to equal protection and equal benefit of the law.
(2) Equality includes the full and equal enjoyment of all rights and fundamental freedoms.
(3) Women and men have the right to equal treatment, including the right to equal opportunities in political, economic, cultural and social spheres.
(4) The State shall not discriminate directly or indirectly against any person on any ground, including race, sex, pregnancy, marital status, health status, ethnic or social origin, colour, age, disability, religion, conscience, belief, culture, dress, language or birth.

### 28. Human dignity
Every person has inherent dignity and the right to have that dignity respected and protected.

### 29. Freedom and security of the person
Every person has the right to freedom and security of the person, which includes the right not to be—
(a) deprived of freedom arbitrarily or without just cause;
(b) detained without trial, except during a state of emergency;
(c) subjected to any form of violence from either public or private sources;
(d) subjected to torture in any manner, whether physical or psychological;
(e) subjected to corporal punishment; or
(f) treated or punished in a cruel, inhuman or degrading manner.

### 35. Rights of arrested persons
(1) A person who is arrested has the right—
(a) to be informed promptly, in language that the person understands, of—
(i) the reason for the arrest;
(ii) the right to remain silent; and
(iii) the consequences of not remaining silent;
(b) to remain silent;
(c) to communicate with an advocate, and other persons whose assistance is necessary;
(d) not to be compelled to make any confession or admission that could be used in evidence against the person;
(e) to be held separately from persons who are serving a sentence;
(f) to be brought before a court as soon as reasonably possible, but not later than—
(i) twenty-four hours after being arrested; or
(ii) if the twenty-four hours ends outside ordinary court hours, or on a day that is not an ordinary court day, the end of the next court day;
(g) at the first court appearance, to be charged or informed of the reason for the detention continuing, or to be released; and
(h) to be released on bond or bail, on reasonable conditions, pending a charge or trial, unless there are compelling reasons not to be released.

### 40. Protection of right to property
(1) Subject to Article 65, every person has the right, either individually or in association with others, to acquire and own property—
(a) of any description; and
(b) in any part of Kenya.
(2) Parliament shall not enact a law that permits the State or any person—
(a) to arbitrarily deprive a person of property of any description or of any interest in, or right over, any property of any description; or
(b) to limit, or in any way restrict the enjoyment of any right under this Article on the basis of any of the grounds specified or contemplated in Article 27(4).

---

## CHAPTER SIX: LEADERSHIP AND INTEGRITY

### 73. Responsibilities of leadership
(1) Authority assigned to a State officer—
(a) is a public trust to be exercised in a manner that—
(i) is consistent with the purposes and objects of this Constitution;
(ii) demonstrates respect for the people;
(iii) brings honour to the nation and dignity to the office; and
(iv) promotes public confidence in the integrity of the office; and
(b) vests in the State officer the responsibility to serve the people, rather than to rule them.

---

*This is a summary of key provisions. For the complete Constitution, visit the official Kenya Law website.*
"""

        # Sample Laws
        laws_data = [
            {
                "title": "The Employment Act, 2007",
                "summary": "An Act of Parliament to declare and define the fundamental rights of employees, to provide basic conditions of employment of employees and to regulate employment of children.",
                "content": """
# THE EMPLOYMENT ACT, 2007

## PART I - PRELIMINARY

### 1. Short title
This Act may be cited as the Employment Act, 2007.

### 2. Interpretation
In this Act, unless the context otherwise requires—
"employee" means a person employed for wages or a salary and includes an apprentice and indentured learner;
"employer" means any person, public body, firm, corporation or company who or which has entered into a contract of service to employ any individual and includes the agent, foreman, manager or factor of such person, public body, firm, corporation or company;

## PART II - FUNDAMENTAL RIGHTS OF EMPLOYEES

### 5. Fundamental rights of employees
Every employee has a right—
(a) to fair labour practices;
(b) to reasonable working conditions;
(c) to form, join or participate in the activities and programmes of a trade union; and
(d) to go on strike.

### 6. Prohibition of forced labour
(1) No person shall be required to perform forced labour.
(2) For the purposes of subsection (1), "forced labour" does not include—
(a) any work required in consequence of a sentence or order of a court;
(b) any work required of a member of a disciplined force in pursuance of his duties as such or, in the case of a person who has conscientious objections to service as a member of a naval, military or air force, any work which that person is required by law to perform in place of such service;
(c) any work required during any period when Kenya is at war or in the event of any emergency or calamity threatening the life or well-being of the community; or
(d) any work which forms part of normal communal or other civic obligations of the life of the community.

## PART III - CONDITIONS OF EMPLOYMENT

### 27. Hours of work
(1) An employer shall regulate the working hours of each employee in accordance with the provisions of this Act.
(2) An employee's normal hours of work shall not exceed—
(a) eight hours in any day; or
(b) forty hours in any week.
(3) An employee shall be entitled to at least one rest day in every period of seven days.

### 28. Overtime
(1) An employee may be required to work overtime in addition to his normal hours of work.
(2) An employer shall pay an employee overtime pay for any time worked in excess of the normal hours of work at the rate of one and one-half times his hourly basic wage in respect of each hour worked.

### 29. Annual leave
(1) An employee shall be entitled to not less than twenty-one working days of annual leave with full pay.
(2) An employee's annual leave shall be taken within twelve months after the end of the leave period in respect of which it is due.

*This is a summary. For the complete Act, refer to the official Kenya Law website.*
""",
                "category": "civil"
            },
            {
                "title": "The Penal Code (Cap. 63)",
                "summary": "The principal legislation governing criminal offences in Kenya, defining various crimes and their penalties.",
                "content": """
# THE PENAL CODE

## PART I - PRELIMINARY

### 1. Short title
This Code may be cited as the Penal Code.

### 2. Interpretation
In this Code, unless the context otherwise requires—
"person" includes a company or association or body of persons, whether corporate or unincorporate;
"property" includes money and all other property, real or personal, movable or immovable, including things in action and other intangible or incorporeal property;

## PART II - GENERAL RULES AS TO CRIMINAL RESPONSIBILITY

### 8. Intention
A person is not criminally responsible for an act or omission unless it is voluntary and intentional.

### 9. Mistake of fact
A person who does or omits to do an act under an honest and reasonable, but mistaken, belief in the existence of any state of things is not criminally responsible for the act or omission to any greater extent than if the real state of things had been such as he believed to exist.

## PART V - OFFENCES AGAINST THE PERSON

### 203. Murder
Any person who of malice aforethought causes death of another person by an unlawful act or omission is guilty of murder.

### 204. Punishment of murder
Any person convicted of murder shall be sentenced to death.

### 237. Assault
Any person who unlawfully assaults another is guilty of a misdemeanour and is liable to imprisonment for one year.

## PART VI - OFFENCES RELATING TO PROPERTY

### 268. Theft
A person who fraudulently and without a claim of right takes anything capable of being stolen, or fraudulently converts to the use of any person, other than the general or special owner thereof, any property, is guilty of the felony termed theft.

### 279. Punishment of theft
Any person who is guilty of theft is liable to imprisonment for three years.

*This is a summary. For the complete Code, refer to the official Kenya Law website.*
""",
                "category": "criminal"
            },
            {
                "title": "The Marriage Act, 2014",
                "summary": "An Act of Parliament to provide for the recognition of different systems of family law, to provide for the rights and responsibilities of spouses and to provide for matters connected therewith.",
                "content": """
# THE MARRIAGE ACT, 2014

## PART I - PRELIMINARY

### 1. Short title
This Act may be cited as the Marriage Act, 2014.

### 2. Interpretation
In this Act, unless the context otherwise requires—
"marriage" means the voluntary union of a man and a woman whether in a monogamous or polygamous union and registered in accordance with this Act;
"spouse" means a party to a marriage;

## PART II - TYPES OF MARRIAGES

### 6. Types of marriages
(1) A marriage may be registered under this Act as—
(a) a monogamous marriage; or
(b) a polygamous marriage.
(2) A monogamous marriage is a marriage between one man and one woman.
(3) A polygamous marriage is a marriage in which a man may marry more than one woman.

### 7. Minimum age of marriage
(1) A person shall not be capable of contracting a marriage if the person has not attained the age of eighteen years.
(2) Notwithstanding subsection (1), a court may grant permission for a person who has attained the age of sixteen years but has not attained the age of eighteen years to marry if the court is satisfied that there are exceptional circumstances.

## PART III - RIGHTS AND OBLIGATIONS OF SPOUSES

### 12. Rights and obligations of spouses
(1) Spouses in a marriage have equal rights and obligations at the time of the marriage, during the marriage and at the dissolution of the marriage.
(2) Spouses have a right to—
(a) live together;
(b) mutually support each other;
(c) jointly make decisions on matters affecting the family;
(d) share equally in the management of the matrimonial home; and
(e) jointly make decisions on matters affecting the children.

### 13. Matrimonial property
(1) Subject to subsection (2), the interest of either spouse in any immovable or movable property acquired during marriage shall be presumed to be in equal shares.
(2) The presumption in subsection (1) shall be rebuttable.

*This is a summary. For the complete Act, refer to the official Kenya Law website.*
""",
                "category": "family"
            }
        ]

        # Create or update Constitution article
        constitution, created = LegalArticle.objects.update_or_create(
            title="Constitution of Kenya, 2010",
            defaults={
                "summary": "The supreme law of Kenya, establishing the structure of government, fundamental rights and freedoms, and the rule of law.",
                "content": constitution_content,
                "category": "constitutional",
                "author": "Government of Kenya"
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS('Successfully created Constitution article'))
        else:
            self.stdout.write(self.style.SUCCESS('Updated Constitution article'))

        # Create sample laws
        for law_data in laws_data:
            law, created = LegalArticle.objects.update_or_create(
                title=law_data["title"],
                defaults={
                    "summary": law_data["summary"],
                    "content": law_data["content"],
                    "category": law_data["category"],
                    "author": "Parliament of Kenya"
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created: {law_data["title"]}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Updated: {law_data["title"]}'))

        self.stdout.write(self.style.SUCCESS('\nSuccessfully loaded Constitution and sample laws!'))

