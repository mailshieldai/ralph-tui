/**
 * ABOUTME: RightPanel component for the Ralph TUI.
 * Displays the current iteration details or selected task details.
 */

import type { ReactNode } from 'react';
import { colors, getTaskStatusColor, getTaskStatusIndicator } from '../theme.js';
import type { RightPanelProps } from '../types.js';

/**
 * Display when no task is selected.
 * Shows helpful setup instructions for new users.
 */
function NoSelection(): ReactNode {
  return (
    <box
      style={{
        flexGrow: 1,
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <box style={{ marginBottom: 1 }}>
        <text fg={colors.fg.primary}>Getting Started</text>
      </box>
      <box style={{ marginBottom: 2 }}>
        <text fg={colors.fg.secondary}>
          No tasks available. To start working with Ralph:
        </text>
      </box>
      <box style={{ flexDirection: 'column', gap: 1 }}>
        <text fg={colors.fg.muted}>
          <span fg={colors.accent.primary}>1.</span> Run{' '}
          <span fg={colors.fg.secondary}>ralph-tui setup</span> to configure your project
        </text>
        <text fg={colors.fg.muted}>
          <span fg={colors.accent.primary}>2.</span> Run{' '}
          <span fg={colors.fg.secondary}>ralph-tui run</span> to start execution
        </text>
        <text fg={colors.fg.muted}>
          <span fg={colors.accent.primary}>3.</span> Or run{' '}
          <span fg={colors.fg.secondary}>ralph-tui --help</span> for more options
        </text>
      </box>
      <box style={{ marginTop: 2 }}>
        <text fg={colors.fg.dim}>Press 'q' or Esc to quit</text>
      </box>
    </box>
  );
}

/**
 * Task details view
 */
function TaskDetails({
  task,
  currentIteration,
  iterationOutput,
}: {
  task: NonNullable<RightPanelProps['selectedTask']>;
  currentIteration: number;
  iterationOutput?: string;
}): ReactNode {
  const statusColor = getTaskStatusColor(task.status);
  const statusIndicator = getTaskStatusIndicator(task.status);

  return (
    <box style={{ flexDirection: 'column', padding: 1, flexGrow: 1 }}>
      {/* Task title and status */}
      <box style={{ marginBottom: 1 }}>
        <text>
          <span fg={statusColor}>{statusIndicator}</span>
          <span fg={colors.fg.primary}> {task.title}</span>
        </text>
      </box>

      {/* Task metadata */}
      <box style={{ flexDirection: 'row', gap: 2, marginBottom: 1 }}>
        <text fg={colors.fg.muted}>
          ID: <span fg={colors.fg.secondary}>{task.id}</span>
        </text>
        <text fg={colors.fg.muted}>
          Status: <span fg={statusColor}>{task.status}</span>
        </text>
        {task.iteration !== undefined && (
          <text fg={colors.fg.muted}>
            Iteration: <span fg={colors.accent.primary}>{task.iteration}</span>
          </text>
        )}
      </box>

      {/* Task description */}
      {task.description && (
        <box
          style={{
            marginBottom: 1,
            padding: 1,
            backgroundColor: colors.bg.tertiary,
            border: true,
            borderColor: colors.border.muted,
          }}
        >
          <text fg={colors.fg.secondary}>{task.description}</text>
        </box>
      )}

      {/* Iteration output - shows output for the selected task's iteration */}
      <box
        title={currentIteration > 0 ? `Iteration ${currentIteration}` : 'Output'}
        style={{
          flexGrow: 1,
          border: true,
          borderColor: colors.border.normal,
          backgroundColor: colors.bg.secondary,
        }}
      >
        <scrollbox style={{ flexGrow: 1, padding: 1 }}>
          {iterationOutput !== undefined && iterationOutput.length > 0 ? (
            <text fg={colors.fg.secondary}>{iterationOutput}</text>
          ) : iterationOutput === '' ? (
            <text fg={colors.fg.muted}>No output captured</text>
          ) : currentIteration === 0 ? (
            <text fg={colors.fg.muted}>Task not yet executed</text>
          ) : (
            <text fg={colors.fg.muted}>Waiting for output...</text>
          )}
        </scrollbox>
      </box>
    </box>
  );
}

/**
 * RightPanel component showing task details or iteration output
 */
export function RightPanel({
  selectedTask,
  currentIteration,
  iterationOutput,
}: RightPanelProps): ReactNode {
  return (
    <box
      title="Details"
      style={{
        flexGrow: 2,
        flexShrink: 1,
        minWidth: 40,
        flexDirection: 'column',
        backgroundColor: colors.bg.primary,
        border: true,
        borderColor: colors.border.normal,
      }}
    >
      {selectedTask ? (
        <TaskDetails
          task={selectedTask}
          currentIteration={currentIteration}
          iterationOutput={iterationOutput}
        />
      ) : (
        <NoSelection />
      )}
    </box>
  );
}
