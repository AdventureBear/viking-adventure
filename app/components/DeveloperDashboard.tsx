import React from 'react';
import { allScenes, initialSceneId } from '@/lib/scenes';
import { StoryPhase, Alignment } from '@/app/types';

const DeveloperDashboard: React.FC = () => {
  // Calculate metrics
  const totalScenes = Object.keys(allScenes).length;
  const scenesByPhase = Object.values(allScenes).reduce((acc, scene) => {
    acc[scene.storyPhase] = (acc[scene.storyPhase] || 0) + 1;
    return acc;
  }, {} as Record<StoryPhase, number>);

  const scenesByAlignment = Object.values(allScenes).reduce((acc, scene) => {
    scene.choices.forEach(choice => {
      acc[choice.alignment] = (acc[choice.alignment] || 0) + 1;
    });
    return acc;
  }, {} as Record<Alignment, number>);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Viking Adventure Developer Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Scenes</h2>
          <p className="text-4xl font-bold text-blue-600">{totalScenes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Story Phases</h2>
          <div className="space-y-2">
            {Object.entries(scenesByPhase).map(([phase, count]) => (
              <div key={phase} className="flex justify-between">
                <span>{phase}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Alignment Distribution</h2>
          <div className="space-y-2">
            {Object.entries(scenesByAlignment).map(([alignment, count]) => (
              <div key={alignment} className="flex justify-between">
                <span>{alignment}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scene Graph */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Scene Connections</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Scene ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phase</th>
                <th className="px-4 py-2 text-left">Choices</th>
                <th className="px-4 py-2 text-left">Required</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(allScenes).map((scene) => (
                <tr key={scene.id} className="border-t">
                  <td className="px-4 py-2">{scene.id}</td>
                  <td className="px-4 py-2">{scene.name}</td>
                  <td className="px-4 py-2">{scene.storyPhase}</td>
                  <td className="px-4 py-2">
                    <ul className="list-disc list-inside">
                      {scene.choices.map((choice, index) => (
                        <li key={index}>
                          {choice.text} → {choice.nextScene}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2">{scene.isRequired ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Story Flow */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Story Flow</h2>
        <div className="space-y-4">
          {Object.values(allScenes).map((scene) => (
            <div key={scene.id} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">{scene.name}</h3>
              <p className="text-sm text-gray-600">{scene.text.substring(0, 100)}...</p>
              <div className="mt-2">
                <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                  {scene.storyPhase}
                </span>
                {scene.isRequired && (
                  <span className="ml-2 text-sm bg-green-200 px-2 py-1 rounded">
                    Required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard; 