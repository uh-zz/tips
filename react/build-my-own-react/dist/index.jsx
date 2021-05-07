"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function createElement(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return {
        type: type,
        props: __assign(__assign({}, props), { children: children.map(function (child) {
                return typeof child === 'object'
                    ? child
                    : createTextElement(child);
            }) })
    };
}
function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    };
}
function createDom(fiber) {
    var dom = fiber.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(fiber.type);
    updateDom(dom, {}, fiber.props);
    return dom;
}
var isEvent = function (key) { return key.startsWith('on'); };
var isProperty = function (key) {
    return key !== 'children' && !isEvent(key);
};
var isNew = function (prev, next) { return function (key) {
    return prev[key] !== next[key];
}; };
var isGone = function (prev, next) { return function (key) { return !(key in next); }; };
function updateDom(dom, prevProps, nextProps) {
    // Remove old or changed event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(function (key) {
        return !(key in nextProps) ||
            isNew(prevProps, nextProps)(key);
    })
        .forEach(function (name) {
        var eventType = name
            .toLowerCase()
            .substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
    });
    // Remove old properties
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(function (name) {
        dom[name] = '';
    });
    // Set new or changed properties
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(function (name) {
        dom[name] = nextProps[name];
    });
    // Add event listeners
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(function (name) {
        var eventType = name
            .toLowerCase()
            .substring(2);
        dom.addEventListener(eventType, nextProps[name]);
    });
}
var nextUnitOfWork = undefined;
var currentRoot = undefined;
var wipRoot = undefined;
var deletions = undefined;
function commitRoot() {
    deletions.forEach(commitWork);
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = undefined;
}
function commitWork(fiber) {
    if (!fiber) {
        return;
    }
    var domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    var domParent = domParentFiber.dom;
    if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== undefined) {
        domParent.appendChild(fiber.dom);
    }
    else if (fiber.effectTag === 'UPDATE' && fiber.dom !== undefined) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    }
    else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent);
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}
function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    }
    else {
        commitDeletion(fiber.child, domParent);
    }
}
function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
        alternate: currentRoot,
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
}
function workLoop(deadline) {
    var shildYield = false;
    while (nextUnitOfWork && !shildYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shildYield = deadline.timeRemainig() < 1;
    }
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }
    window.requestIdleCallback(workLoop);
}
window.requestIdleCallback(workLoop);
function performUnitOfWork(fiber) {
    var isFunctionComponent = fiber.type instanceof Function;
    if (isFunctionComponent) {
        updateFunctionComponent(fiber);
    }
    else {
        updateHostComponent(fiber);
    }
    if (fiber.child) {
        return fiber.child;
    }
    var nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}
var wipFiber = undefined;
var hookIndex = undefined;
function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];
    var children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
}
function useState(initial) {
    var _a;
    var oldHook = (_a = wipFiber.alternate) === null || _a === void 0 ? void 0 : _a.hooks[hookIndex];
    var hook = {
        state: oldHook ? oldHook.state : initial,
        queue: [],
    };
    var actions = oldHook ? oldHook.queue : [];
    actions.forEach(function (action) {
        hook.state = action(hook.state);
    });
    var setState = function (action) {
        hook.queue.push(action);
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        };
        nextUnitOfWork = wipRoot;
        deletions = [];
    };
    wipFiber.hooks.push(hook);
    hookIndex++;
    return [hook.state, setState];
}
function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber.props.children);
}
function reconcileChildren(wipFiber, elements) {
    var _a;
    var index = 0;
    var oldFiber = (_a = wipFiber.alternate) === null || _a === void 0 ? void 0 : _a.child;
    var prevSibling = undefined;
    while (index < elements.length || oldFiber != undefined) {
        var element_1 = elements[index];
        var newFiber = undefined;
        var sameType = oldFiber &&
            element_1 &&
            element_1.type == oldFiber.type;
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element_1.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: "UPDATE",
            };
        }
        if (element_1 && !sameType) {
            newFiber = {
                type: element_1.type,
                props: element_1.props,
                dom: undefined,
                parent: wipFiber,
                alternate: undefined,
                effectTag: "PLACEMENT",
            };
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION";
            deletions.push(oldFiber);
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        if (index === 0) {
            wipFiber.child = newFiber;
        }
        else if (element_1) {
            prevSibling.sibling = newFiber;
        }
        prevSibling = newFiber;
        index++;
    }
}
/** @jsx createElement */
function Counter() {
    var _a = useState(1), state = _a[0], setState = _a[1];
    return (<h1 onClick={function () { return setState(function (c) { return c + 1; }); }}>
      Count: {state}
    </h1>);
}
var element = <Counter />;
var container = document.getElementById("root");
render(element, container);
//# sourceMappingURL=index.jsx.map