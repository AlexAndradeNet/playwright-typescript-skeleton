import { expect, JSHandle, Locator, type Page, test } from '@playwright/test';
import { Todo } from './Todo';

test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await page.goto('https://demo.playwright.dev/todomvc');
});

const TODO_ITEMS: readonly string[] = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment',
];

test.describe('New Todo', () => {
    test('should allow me to add todo items', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        // create a new locator for Todos
        const newTodo: Locator = page.getByPlaceholder(
            'What needs to be done?'
        );

        // Create 1st item of todos
        await newTodo.fill(TODO_ITEMS[0]);
        await newTodo.press('Enter');

        // Make sure the list only has one item from the list of todos.
        await expect(page.getByTestId('todo-title')).toHaveText([
            TODO_ITEMS[0],
        ]);

        // Create 2nd item of todos
        await newTodo.fill(TODO_ITEMS[1]);
        await newTodo.press('Enter');

        // Make sure the list now has two items.
        await expect(page.getByTestId('todo-title')).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1],
        ]);

        await checkNumberOfTodosInLocalStorage(page, 2);
    });

    test('should clear text input field when an item is added', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        // create a new locator for Todos
        const newTodo: Locator = page.getByPlaceholder(
            'What needs to be done?'
        );

        // Create one item in the list of todos.
        await newTodo.fill(TODO_ITEMS[0]);
        await newTodo.press('Enter');

        // Check that input is empty.
        await expect(newTodo).toBeEmpty();
        await checkNumberOfTodosInLocalStorage(page, 1);
    });

    test('should append new items to the bottom of the list', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        // Create 3 items.
        await createDefaultTodos(page);

        // create a locator for counting the todos
        const todoCount: Locator = page.getByTestId('todo-count');

        // Check test using different methods.
        await expect(page.getByText('3 items left')).toBeVisible();
        await expect(todoCount).toHaveText('3 items left');
        await expect(todoCount).toContainText('3');
        await expect(todoCount).toHaveText(/3/);

        // Check all items in one call.
        await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
        await checkNumberOfTodosInLocalStorage(page, 3);
    });
});

test.describe('Mark all as completed', () => {
    test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
        await createDefaultTodos(page);
        await checkNumberOfTodosInLocalStorage(page, 3);
    });

    test.afterEach(async ({ page }: { page: Page }): Promise<void> => {
        await checkNumberOfTodosInLocalStorage(page, 3);
    });

    test('should allow me to mark all items as completed', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        // Complete all todos.
        await page.getByLabel('Mark all as complete').check();

        // Ensure all todos have 'completed' class.
        await expect(page.getByTestId('todo-item')).toHaveClass([
            'completed',
            'completed',
            'completed',
        ]);
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);
    });

    test('should allow me to clear the complete state of all items', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const toggleAll: Locator = page.getByLabel('Mark all as complete');
        // Check and then immediately uncheck.
        await toggleAll.check();
        await toggleAll.uncheck();

        // Should be no completed classes.
        await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
    });

    test('complete all checkbox should update state when items are completed / cleared', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const toggleAll: Locator = page.getByLabel('Mark all as complete');
        await toggleAll.check();
        await expect(toggleAll).toBeChecked();
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);

        // Uncheck first item from todos list
        const firstTodo: Locator = page.getByTestId('todo-item').nth(0);
        await firstTodo.getByRole('checkbox').uncheck();

        // Reuse toggleAll locator and make sure it's not checked.
        await expect(toggleAll).not.toBeChecked();

        await firstTodo.getByRole('checkbox').check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 3);

        // Assert the toggle all is checked again.
        await expect(toggleAll).toBeChecked();
    });
});

test.describe('Item', () => {
    test('should allow me to mark items as complete', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        // create a new locator for todos
        await createTodos(page, 2);

        // Check first item.
        const firstTodo: Locator = page.getByTestId('todo-item').nth(0);
        await firstTodo.getByRole('checkbox').check();
        await expect(firstTodo).toHaveClass('completed');

        // Check second item.
        const secondTodo: Locator = page.getByTestId('todo-item').nth(1);
        await expect(secondTodo).not.toHaveClass('completed');
        await secondTodo.getByRole('checkbox').check();

        // Assert completed class.
        await expect(firstTodo).toHaveClass('completed');
        await expect(secondTodo).toHaveClass('completed');
    });

    test('should allow me to un-mark items as complete', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        await createTodos(page, 2);

        const firstTodo: Locator = page.getByTestId('todo-item').nth(0);
        const secondTodo: Locator = page.getByTestId('todo-item').nth(1);
        const firstTodoCheckbox: Locator = firstTodo.getByRole('checkbox');

        await firstTodoCheckbox.check();
        await expect(firstTodo).toHaveClass('completed');
        await expect(secondTodo).not.toHaveClass('completed');
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);

        await firstTodoCheckbox.uncheck();
        await expect(firstTodo).not.toHaveClass('completed');
        await expect(secondTodo).not.toHaveClass('completed');
        await checkNumberOfCompletedTodosInLocalStorage(page, 0);
    });

    test('should allow me to edit an item', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        await createDefaultTodos(page);

        const todoItems: Locator = page.getByTestId('todo-item');
        const secondTodo: Locator = todoItems.nth(1);
        await secondTodo.dblclick();
        await expect(
            secondTodo.getByRole('textbox', { name: 'Edit' })
        ).toHaveValue(TODO_ITEMS[1]);
        await secondTodo
            .getByRole('textbox', { name: 'Edit' })
            .fill('buy some sausages');
        await secondTodo.getByRole('textbox', { name: 'Edit' }).press('Enter');

        // Explicitly assert the new text value.
        await expect(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2],
        ]);
        await checkTodosInLocalStorage(page, 'buy some sausages');
    });
});

test.describe('Editing', (): void => {
    test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
        await createDefaultTodos(page);
        await checkNumberOfTodosInLocalStorage(page, 3);
    });

    test('should hide other controls when editing', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const todoItem: Locator = page.getByTestId('todo-item').nth(1);
        await todoItem.dblclick();
        await expect(todoItem.getByRole('checkbox')).toBeHidden();
        await expect(
            todoItem.locator('label', {
                hasText: TODO_ITEMS[1],
            })
        ).toBeHidden();
        await checkNumberOfTodosInLocalStorage(page, 3);
    });

    test('should save edits on blur', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const todoItems: Locator = page.getByTestId('todo-item');
        await todoItems.nth(1).dblclick();
        await todoItems
            .nth(1)
            .getByRole('textbox', { name: 'Edit' })
            .fill('buy some sausages');
        await todoItems
            .nth(1)
            .getByRole('textbox', { name: 'Edit' })
            .dispatchEvent('blur');

        await expect(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2],
        ]);
        await checkTodosInLocalStorage(page, 'buy some sausages');
    });

    test('should trim entered text', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const todoItems: Locator = await modifyFirstTodoItemAndPressKey(
            page,
            'Enter'
        );

        await expect(todoItems).toHaveText([
            TODO_ITEMS[0],
            'buy some sausages',
            TODO_ITEMS[2],
        ]);
        await checkTodosInLocalStorage(page, 'buy some sausages');
    });

    test('should remove the item if an empty text string was entered', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const todoItems: Locator = page.getByTestId('todo-item');
        await todoItems.nth(1).dblclick();
        await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('');
        await todoItems
            .nth(1)
            .getByRole('textbox', { name: 'Edit' })
            .press('Enter');

        await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });

    test('should cancel edits on escape', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const todoItems: Locator = await modifyFirstTodoItemAndPressKey(
            page,
            'Escape'
        );

        await expect(todoItems).toHaveText(TODO_ITEMS);
    });
});

test.describe('Counter', (): void => {
    test('should display the current number of todo items', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        // create a new locator for Todos
        const newTodo: Locator = page.getByPlaceholder(
            'What needs to be done?'
        );

        // create a locator for counting the todos
        const todoCount: Locator = page.getByTestId('todo-count');

        await newTodo.fill(TODO_ITEMS[0]);
        await newTodo.press('Enter');

        await expect(todoCount).toContainText('1');

        await newTodo.fill(TODO_ITEMS[1]);
        await newTodo.press('Enter');
        await expect(todoCount).toContainText('2');

        await checkNumberOfTodosInLocalStorage(page, 2);
    });
});

test.describe('Clear completed button', (): void => {
    test.beforeEach(async ({ page }: { page: Page }) => {
        await createDefaultTodos(page);
    });

    test('should display the correct text', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        await page.locator('.todo-list li .toggle').first().check();
        await expect(
            page.getByRole('button', { name: 'Clear completed' })
        ).toBeVisible();
    });

    test('should remove completed items when clicked', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const todoItems: Locator = page.getByTestId('todo-item');
        await todoItems.nth(1).getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Clear completed' }).click();
        await expect(todoItems).toHaveCount(2);
        await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });

    test('should be hidden when there are no items that are completed', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        await page.locator('.todo-list li .toggle').first().check();
        await page.getByRole('button', { name: 'Clear completed' }).click();
        await expect(
            page.getByRole('button', { name: 'Clear completed' })
        ).toBeHidden();
    });
});

test.describe('Persistence', (): void => {
    test('should persist its data', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        await createTodos(page, 2);

        const todoItems: Locator = page.getByTestId('todo-item');
        const firstTodoCheck: Locator = todoItems.nth(0).getByRole('checkbox');
        await firstTodoCheck.check();
        await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
        await expect(firstTodoCheck).toBeChecked();
        await expect(todoItems).toHaveClass(['completed', '']);

        // Ensure there is 1 completed item.
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);

        // Now reload.
        await page.reload();
        await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]]);
        await expect(firstTodoCheck).toBeChecked();
        await expect(todoItems).toHaveClass(['completed', '']);
    });
});

test.describe('Routing', (): void => {
    test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
        await createDefaultTodos(page);
        // make sure the app had a chance to save updated todos in storage
        // before navigating to a new view, otherwise the items can get lost :(
        // in some frameworks like Durandal
        await checkTodosInLocalStorage(page, TODO_ITEMS[0]);
    });

    test('should allow me to display active items', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const todoItem: Locator = page.getByTestId('todo-item');
        await page
            .getByTestId('todo-item')
            .nth(1)
            .getByRole('checkbox')
            .check();

        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.getByRole('link', { name: 'Active' }).click();
        await expect(todoItem).toHaveCount(2);
        await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    });

    test('should respect the back button', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        const todoItem: Locator = page.getByTestId('todo-item');
        await page
            .getByTestId('todo-item')
            .nth(1)
            .getByRole('checkbox')
            .check();

        await checkNumberOfCompletedTodosInLocalStorage(page, 1);

        await test.step('Showing all items', async (): Promise<void> => {
            await page.getByRole('link', { name: 'All' }).click();
            await expect(todoItem).toHaveCount(3);
        });

        await test.step('Showing active items', async (): Promise<void> => {
            await page.getByRole('link', { name: 'Active' }).click();
        });

        await test.step('Showing completed items', async (): Promise<void> => {
            await page.getByRole('link', { name: 'Completed' }).click();
        });

        await expect(todoItem).toHaveCount(1);
        await page.goBack();
        await expect(todoItem).toHaveCount(2);
        await page.goBack();
        await expect(todoItem).toHaveCount(3);
    });

    test('should allow me to display completed items', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        await page
            .getByTestId('todo-item')
            .nth(1)
            .getByRole('checkbox')
            .check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(page.getByTestId('todo-item')).toHaveCount(1);
    });

    test('should allow me to display all items', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        await page
            .getByTestId('todo-item')
            .nth(1)
            .getByRole('checkbox')
            .check();
        await checkNumberOfCompletedTodosInLocalStorage(page, 1);
        await page.getByRole('link', { name: 'Active' }).click();
        await page.getByRole('link', { name: 'Completed' }).click();
        await page.getByRole('link', { name: 'All' }).click();
        await expect(page.getByTestId('todo-item')).toHaveCount(3);
    });

    test('should highlight the currently applied filter', async ({
        page,
    }: {
        page: Page;
    }): Promise<void> => {
        await expect(page.getByRole('link', { name: 'All' })).toHaveClass(
            'selected'
        );

        // create locators for active and completed links
        const activeLink: Locator = page.getByRole('link', { name: 'Active' });
        const completedLink: Locator = page.getByRole('link', {
            name: 'Completed',
        });
        await activeLink.click();

        // Page change - active items.
        await expect(activeLink).toHaveClass('selected');
        await completedLink.click();

        // Page change - completed items.
        await expect(completedLink).toHaveClass('selected');
    });
});

async function createDefaultTodos(page: Page): Promise<void> {
    await createTodos(page, TODO_ITEMS.length);
}

async function createTodos(page: Page, quantity: number): Promise<void> {
    const newTodo: Locator = page.getByPlaceholder('What needs to be done?');

    await TODO_ITEMS.slice(0, quantity).reduce(
        async (previousPromise, item) => {
            await previousPromise;
            await newTodo.fill(item);
            await newTodo.press('Enter');
        },
        Promise.resolve()
    );
}

async function checkNumberOfTodosInLocalStorage(
    page: Page,
    expected: number
): Promise<JSHandle<boolean>> {
    return page.waitForFunction((aliasForTheExpectedParameter: number) => {
        // Safely parse and type the local storage data as an array of the Todos' objects
        const todos: Todo[] = JSON.parse(
            localStorage.getItem('react-todos') ?? '[]'
        ) as Todo[];

        // Check if todos is an array and if its length matches the expected number
        return (
            Array.isArray(todos) &&
            todos.length === aliasForTheExpectedParameter
        );
    }, expected);
}

async function checkNumberOfCompletedTodosInLocalStorage(
    page: Page,
    expected: number
): Promise<JSHandle<boolean>> {
    return page.waitForFunction((aliasForTheExpectedParameter: number) => {
        // Safely parse the local storage item with a default of an empty array string
        const todos: Todo[] = JSON.parse(
            localStorage.getItem('react-todos') ?? '[]'
        ) as Todo[];

        // Filter todos based on the 'completed' property and compare the length
        const completedTodosCount: number = todos.filter(
            todo => todo.completed
        ).length;

        return completedTodosCount === aliasForTheExpectedParameter;
    }, expected);
}

async function checkTodosInLocalStorage(
    page: Page,
    title: string
): Promise<JSHandle<boolean>> {
    return page.waitForFunction((aliasForTheExpectedTitleParameter: string) => {
        // Parse local storage item with a default value and type assertion
        const todos: Todo[] = JSON.parse(
            localStorage.getItem('react-todos') ?? '[]'
        ) as Todo[];

        // Map titles and check for the presence of the specified title
        return todos
            .map(todo => todo.title)
            .includes(aliasForTheExpectedTitleParameter);
    }, title);
}

async function modifyFirstTodoItemAndPressKey(
    page: Page,
    key: string
): Promise<Locator> {
    const todoItems: Locator = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    const firstItemEditField: Locator = todoItems
        .nth(1)
        .getByRole('textbox', { name: 'Edit' });

    await firstItemEditField.fill('    buy some sausages    ');
    await firstItemEditField.press(key);

    return todoItems;
}
