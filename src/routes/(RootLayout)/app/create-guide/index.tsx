import { Title } from "@solidjs/meta";

import CreateGuideForm from "~/components/create-guide-form/CreateGuideForm";

import { GuideDataProvider } from "~/lib/contexts/guideData.context";

export default function CreateGuide() {
  return (
    <GuideDataProvider>
      <main>
        <Title>Create Guide</Title>
        <CreateGuideForm />
      </main>
    </GuideDataProvider>
  );
}
