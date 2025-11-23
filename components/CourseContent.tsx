/**
 * Course content data structure
 * This would typically be stored in a database or CMS
 */

export interface CourseModule {
  id: string
  title: string
  description: string
  duration: string
  content: React.ReactNode
  order: number
}

export const courseModules: CourseModule[] = [
  {
    id: 'dd214',
    title: 'Understanding Your DD-214',
    description: 'Learn how to read and leverage your service record',
    duration: '15 min',
    order: 1,
    content: (
      <div>
        <h3>Your DD-214: The Foundation</h3>
        <p>
          Your DD-214 (Certificate of Release or Discharge from Active Duty) is the most important
          document for your VA claim. It contains:
        </p>
        <ul>
          <li>Your dates of service</li>
          <li>Your MOS (Military Occupational Specialty)</li>
          <li>Your discharge type and character of service</li>
          <li>Awards and decorations</li>
          <li>Service-connected injuries or conditions</li>
        </ul>
        <h4>Key Sections to Review</h4>
        <p>
          Pay special attention to Block 14 (Military Education), Block 18 (Remarks), and Block 30
          (Character of Service). These sections can provide evidence for service connection.
        </p>
        <h4>Action Items</h4>
        <ol>
          <li>Obtain a certified copy of your DD-214</li>
          <li>Review all blocks carefully</li>
          <li>Document any errors or missing information</li>
          <li>Keep multiple copies in safe locations</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'service-connected',
    title: 'Service-Connected Conditions',
    description: 'Identify and document all service-connected conditions',
    duration: '30 min',
    order: 2,
    content: (
      <div>
        <h3>What is Service Connection?</h3>
        <p>
          A service-connected condition is an injury or illness that was caused or aggravated by
          your military service. To establish service connection, you need:
        </p>
        <ol>
          <li>A current diagnosis</li>
          <li>An in-service event or injury</li>
          <li>A medical nexus connecting the two</li>
        </ol>
        <h4>Common Service-Connected Conditions</h4>
        <ul>
          <li>PTSD and other mental health conditions</li>
          <li>Back and joint injuries</li>
          <li>Hearing loss and tinnitus</li>
          <li>Respiratory conditions</li>
          <li>Skin conditions</li>
        </ul>
        <h4>Documentation Strategy</h4>
        <p>
          The key to a successful claim is thorough documentation. Gather all medical records,
          service treatment records, and buddy statements that support your claim.
        </p>
      </div>
    ),
  },
  {
    id: 'cp-exam',
    title: 'C&P Exam Mastery',
    description: 'Complete guide to preparing for and acing your C&P exam',
    duration: '45 min',
    order: 3,
    content: (
      <div>
        <h3>Mastering Your C&P Exam</h3>
        <p>
          The Compensation & Pension (C&P) exam is the most critical part of your claim. This is
          where your rating is determined.
        </p>
        <h4>Before the Exam</h4>
        <ul>
          <li>Review all your medical records</li>
          <li>Prepare a list of symptoms and how they affect your daily life</li>
          <li>Bring all relevant documentation</li>
          <li>Bring a support person if allowed</li>
        </ul>
        <h4>During the Exam</h4>
        <ul>
          <li>Be honest and thorough about your symptoms</li>
          <li>Describe your worst days, not your best days</li>
          <li>Explain how your condition affects work, family, and daily activities</li>
          <li>Don&apos;t minimize your symptoms</li>
        </ul>
        <h4>After the Exam</h4>
        <p>
          Request a copy of the exam report. Review it for accuracy and file a statement if anything
          is incorrect.
        </p>
      </div>
    ),
  },
  {
    id: 'filing-strategy',
    title: 'Claim Filing Strategy',
    description: 'Step-by-step process to file your claim correctly',
    duration: '30 min',
    order: 4,
    content: (
      <div>
        <h3>Filing Your Claim: Step by Step</h3>
        <h4>Step 1: Gather Evidence</h4>
        <p>Collect all medical records, service records, and supporting documentation.</p>
        <h4>Step 2: Complete the Forms</h4>
        <p>
          File Form 21-526EZ (Disability Compensation) for each condition. Be thorough and specific.
        </p>
        <h4>Step 3: Submit Supporting Documents</h4>
        <p>
          Include medical records, service treatment records, buddy statements, and any other
          relevant evidence.
        </p>
        <h4>Step 4: Track Your Claim</h4>
        <p>
          Use the VA.gov portal or eBenefits to track your claim status. Respond promptly to any
          requests for additional information.
        </p>
      </div>
    ),
  },
  {
    id: 'maximizing-rating',
    title: 'Maximizing Your Rating',
    description: 'Advanced strategies to combine conditions and maximize percentage',
    duration: '45 min',
    order: 5,
    content: (
      <div>
        <h3>Maximizing Your Rating Percentage</h3>
        <p>
          The VA uses a combined rating table to calculate your total disability percentage.
          Here&apos;s how to maximize it:
        </p>
        <h4>Understanding Combined Ratings</h4>
        <p>
          Ratings don&apos;t simply add up. The VA uses a specific formula that accounts for the
          &quot;whole person&quot; concept. Multiple conditions combine in a way that prevents the
          total from exceeding 100%.
        </p>
        <h4>Strategic Filing</h4>
        <ul>
          <li>File for all service-connected conditions</li>
          <li>Understand secondary conditions</li>
          <li>Know the rating criteria for each condition</li>
          <li>File for increases if conditions worsen</li>
        </ul>
        <h4>Secondary Conditions</h4>
        <p>
          A secondary condition is one that is caused or aggravated by a service-connected
          condition. These can significantly increase your rating.
        </p>
      </div>
    ),
  },
  {
    id: 'appeals',
    title: 'Appeals and Reconsideration',
    description: 'What to do if your claim is denied or underrated',
    duration: '30 min',
    order: 6,
    content: (
      <div>
        <h3>If Your Claim is Denied or Underrated</h3>
        <p>
          Don&apos;t give up. Many successful claims require appeals. Here&apos;s your strategy:
        </p>
        <h4>Understanding the Decision</h4>
        <p>
          Review the decision letter carefully. Understand why your claim was denied or why you
          received a lower rating than expected.
        </p>
        <h4>Appeal Options</h4>
        <ul>
          <li>Supplemental Claim: Submit new evidence</li>
          <li>Higher-Level Review: Request a senior reviewer</li>
          <li>Board Appeal: Formal appeal to the Board of Veterans&apos; Appeals</li>
        </ul>
        <h4>Gathering Additional Evidence</h4>
        <p>
          Use the denial as a roadmap. Address each reason for denial with specific evidence. Get
          independent medical opinions if needed.
        </p>
      </div>
    ),
  },
]
